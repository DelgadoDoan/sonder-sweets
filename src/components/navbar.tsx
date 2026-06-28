import Link from "next/link"

export default function NavBar() {
    return(
        <nav>
            <div>
                Brand and logo goes here
            </div>
            <ul>

                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/auth/login">Log In</Link>
            </ul>
        </nav>
    )
}