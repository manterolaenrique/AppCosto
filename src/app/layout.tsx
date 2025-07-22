import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TripProvider } from '../context/TripContext';
import { EventoProvider } from '../context/EventoContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body>
        <TripProvider>
          <EventoProvider>
            {children}
          </EventoProvider>
        </TripProvider>
      </body>
    </html>
  );
}
