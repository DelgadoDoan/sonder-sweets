import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#c3dcda] via-[#e4f1f0] to-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-2 py-12 md:flex-row md:px-4">
        <div className="max-w-sm text-center md:text-left">
          <h1 className="font-serif text-4xl font-bold leading-tight text-[#3d2b1f] md:text-5xl">
            Experience
            <br />
            <span className="text-[#e8836a]">Home-baked</span>
            <br />
            Goodness
            <br />
            Every Day
          </h1>

          <Link
            href="/products"
            className="mt-8 inline-flex h-14 w-44 items-center justify-center rounded-2xl bg-[#4b3123] text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#3c261b] hover:shadow-xl"
          >
            Order Now
          </Link>
        </div>

        <div className="relative h-[240px] w-[240px] md:h-[300px] md:w-[300px]">
          <Image
            src="/assets/big-cookie.png"
            alt="Chocolate chip cookie"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}