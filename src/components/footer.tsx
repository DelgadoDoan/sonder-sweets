import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-10 bg-[#3d2b1f] px-6 py-10 text-[#f4e9d8] md:flex-row md:justify-between md:px-16 md:py-16">
            {/* Logo and tagline */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                <Image src="/assets/logo.png" alt="Sonder Sweets" width={140} height={140} />
                <p className="max-w-xs text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-2 text-lg">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/location">Location</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
            </ul>
        </footer>
    );
}