import Footer from '@/src/components/footer'
import NavBar from '@/src/components/navbar'
import HeroSection from '@/src/components/hero-section'

export default function Home() {
    return(
        <>
            <NavBar />
            <HeroSection />
            <h1>This is the homepage</h1>
            <Footer />
        </>
    )
}