import Footer from '@/src/components/footer'
import HeroSection from '@/src/components/hero-section';
import NavBar from '@/src/components/navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
      <section>
        <NavBar />
        <HeroSection />
        {children}
        <Footer />
      </section>
  );
}
