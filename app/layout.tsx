import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
// import { getUser } from './lib/dal';
// import { ContextProvider } from 'auth-lib';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();
  
  return (
    <html lang="en">
      {/* <ContextProvider> */}
        <body className={`${inter.className} antialiased`}>{children}</body>
      {/* </ContextProvider> */}
    </html>
  );
}