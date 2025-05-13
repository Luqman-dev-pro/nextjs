import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CartDrawer from "@/components/CartDrawer";
import Header from '@/components/layout/Header';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
        <body className={`${inter.className} antialiased`}>
          <Header />
          {children}
          <CartDrawer />  
        </body>
    </html>
  );
}