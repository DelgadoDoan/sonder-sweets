"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import Modal from "./ui/modal";
import { useState, useRef, useCallback, useEffect } from "react";
import { setBasketItemQuantity } from "../actions/basket";

interface ProductCardProps {
  productId: number;
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  initialQuantity: number;
}

const ACCENT = "#4b3123";
const DEBOUNCE_MS = 500;

export default function ProductCard({
  productId,
  productName,
  description,
  price,
  stock,
  imageUrl,
  initialQuantity,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(initialQuantity);

  // holds the latest quantity we still need to sync to the server
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingQuantityRef = useRef<number | null>(null);

  const syncQuantity = useCallback(async (qty: number) => {
    try {
      await setBasketItemQuantity(productId, qty);    // Pass the final quantity
    } catch (err) {
      console.error("Failed to sync basket item:", err);
      // To add: rollback toast
    }
  }, [productId]);

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

  // clean up any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Side effects (scheduleSync) now run *after* setQuantity, not inside the
  // updater function itself, so they never fire during the render phase.
  function handleIncrement() {
    const next = Math.min(stock, quantity + 1);
    setQuantity(next);
    scheduleSync(next);
  }

  function handleDecrement() {
    const next = Math.max(0, quantity - 1);
    setQuantity(next);
    scheduleSync(next);
  }

  const isOutOfStock = stock === 0;

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>Hello</Modal>
      <div className="group w-[340px] rounded-3xl border border-black/10 bg-white shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-black/20">
        <div className="relative w-full aspect-square sm:aspect-[4/3] bg-neutral-100 overflow-hidden cursor-pointer">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(75,49,35,0.15), transparent)",
            }}
          />
          <Image
            src={`/assets/${imageUrl}`}
            alt={productName}
            fill
            sizes="340px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onClick={() => setIsModalOpen(true)}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
              <span
                className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Out of stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-xl text-[#4b3123]">{productName}</span>
          </div>
          <span className="text-lg">₱{price.toFixed(2)}</span>
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-400 mt-auto">
            <span>{isOutOfStock ? "Unavailable" : `Stock: ${stock}`}</span>
            <div className="flex items-center gap-2">
              {quantity > 0 && (
                <>
                  <button
                    onClick={handleDecrement}
                    disabled={isOutOfStock}
                    className="p-1.5 rounded-full border border-black/10 text-neutral-600 transition-all duration-200 hover:bg-[#4b3123] hover:cursor-pointer hover:text-white disabled:opacity-40 disabled:cursor-default"
                  >
                    <Minus className="w-4 h-4" strokeWidth={2.5} />
                  </button>

                  <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                </>
              )}

              <button
                onClick={handleIncrement}
                disabled={isOutOfStock || quantity >= stock}
                className="p-1.5 rounded-full border border-black/10 text-neutral-600 transition-all duration-200 enabled:hover:bg-[#4b3123] enabled:hover:cursor-pointer enabled:hover:text-white disabled:opacity-40 disabled:cursor-default"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}