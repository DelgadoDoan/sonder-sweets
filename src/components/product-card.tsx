"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import Modal from "./ui/modal"
import { useState } from "react";

interface ProductCardProps {
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ACCENT = "#4b3123";

export default function ProductCard({
  productName,
  description,
  price,
  stock,
  imageUrl,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isOutOfStock = stock === 0;

  return (
    <>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>Hello</Modal>
    <div className="group w-[340px] rounded-3xl border border-black/10 bg-white shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-black/20">
      {/* Image */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] bg-neutral-100 overflow-hidden cursor-pointer">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(75,49,35,0.15), transparent)",
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

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-xl text-[#4b3123]">{productName}</span>
        </div>

        <span className="text-lg">₱{price.toFixed(2)}</span>

        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-neutral-400 mt-auto">
          <span>
            {isOutOfStock ? "Unavailable" : `Stock: ${stock}`}
          </span>

          <button
            disabled
            aria-label="Add to cart"
            className="p-1.5 rounded-full border border-black/10 text-neutral-600 transition-all duration-200 hover:bg-[#4b3123] hover:text-white hover:scale-110 hover:cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}