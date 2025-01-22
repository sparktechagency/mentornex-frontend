import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/provider/Provider';

export const metadata: Metadata = {
      title: 'Mentornex',
      description: 'Mentornex is a platform that connects aspiring professionals with experienced mentors in the industry.',
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="en">
                  <body className={``}>
                        <Provider>{children}</Provider>
                  </body>
            </html>
      );
}
