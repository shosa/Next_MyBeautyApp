import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'MyBeautyApp',
  description: 'Gestisci i tuoi appuntamenti e servizi con MyBeautyApp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
        <link rel="manifest" href="/manifest.json" />
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}
