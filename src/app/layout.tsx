import type { Metadata } from "next";
import "./globals.css";
import { TripProvider } from '../context/TripContext';
import { EventoProvider } from '../context/EventoContext';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Costeador de Eventos y Viajes",
  description: "Organiza, divide y visualiza gastos de eventos y viajes grupales de manera sencilla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="flex flex-col min-h-screen">
        <TripProvider>
          <EventoProvider>
            {children}
            <Footer />
          </EventoProvider>
        </TripProvider>
      </body>
    </html>
  );
}
