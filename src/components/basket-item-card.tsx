"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { setBasketItemQuantity } from "../actions/basket";

interface BasketItemCardProps {
    productId: number;
    productName: string;
    price: number;
    initialQuantity: number;
    stock: number;
    imageUrl: string;
}

const ACCENT = "#4b3123";
const DEBOUNCE_MS = 500;

export default function BasketItemCard({
    productId,
    productName,
    price,
    initialQuantity,
    stock,
    imageUrl,
}: BasketItemCardProps) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(initialQuantity);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const pendingQuantityRef = useRef<number | null>(null)

    const syncQuantity = useCallback(async (qty: number) => {
        try {
            await setBasketItemQuantity(productId, qty);
            if (qty === 0) {
                router.refresh(); // re-fetch server data; item disappears from the list
            }
        } catch (err) {
            console.error("Failed to sync basket item:", err);
            // To add: rollback toast
        }
    }, [productId, router]);

    const scheduleSync = useCallback(
        (qty: number) => {
            pendingQuantityRef.current = qty;
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                if (pendingQuantityRef.current !== null) {
                    syncQuantity(pendingQuantityRef.current);
                }
            }, DEBOUNCE_MS);
        },
        [syncQuantity]
    );

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    // Side effects (syncQuantity/scheduleSync) now run *after* setQuantity,
    // not inside the updater function itself, so they never fire during render.
    function handleIncrement() {
        const next = Math.min(stock, quantity + 1);
        setQuantity(next);
        scheduleSync(next);
    }

    function handleDecrement() {
        const next = Math.max(0, quantity - 1);
        setQuantity(next);
        if (next === 0) {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            syncQuantity(0);
        } else {
            scheduleSync(next);
        }
    }

    if (quantity === 0) return null; // hide immediately, don't wait for refresh

    return (
        <div className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white">
            <div className="flex items-center gap-6 p-5">
                {/* Product Image */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                        src={`/assets/${imageUrl}`}
                        alt={productName}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col">
                    <h2 className="text-xl font-medium text-[#4b3123]">
                        {productName}
                    </h2>

                    <p className="mt-1 text-lg font-semibold">
                        ₱{price.toFixed(2)}
                    </p>

                    <p className="mt-2 text-sm text-neutral-500">
                        Stock: {stock}
                    </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrement}
                            disabled={quantity <= 0}
                            className="p-1.5 rounded-full border border-black/10 text-neutral-600 transition-all duration-200 enabled:hover:bg-[#4b3123] enabled:hover:text-white enabled:hover:cursor-pointer disabled:opacity-40 disabled:cursor-default"
                        >
                            <Minus className="w-4 h-4" strokeWidth={2.5} />
                        </button>

                        <span className="w-8 text-center text-base font-medium">
                            {quantity}
                        </span>

                        <button
                            onClick={handleIncrement}
                            disabled={quantity >= stock}
                            className="p-1.5 rounded-full border border-black/10 text-neutral-600 transition-all duration-200 enabled:hover:bg-[#4b3123] enabled:hover:text-white enabled:hover:cursor-pointer disabled:opacity-40 disabled:cursor-default"
                        >
                            <Plus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                    </div>

                    <p
                        className="text-sm font-medium"
                        style={{ color: ACCENT }}
                    >
                        Total: ₱{(price * quantity).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}