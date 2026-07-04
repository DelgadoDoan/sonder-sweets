import Footer from '@/src/components/footer'
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
        {children}
        <Footer />
      </section>
  );
}
