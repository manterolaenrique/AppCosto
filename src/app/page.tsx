"use client";
import React from "react";
import EventosDashboard from "./eventos/page";
import Dashboard from "./dashboard/page";
import "./ui.css";

export default function Home() {
  return (
    <main className="bg-gradient-app flex flex-col items-center py-8 px-4 font-fun flex-1">
      <h1 className="title-main mb-6">
        <span className="inline-block animate-bounce">🍽️</span>
        Costeador de Eventos y Viajes
        <span className="inline-block animate-bounce">✈️</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center">
        {/* Tarjeta Costeador de Eventos */}
        <section className="card flex-1 min-w-[320px]">
          <EventosDashboard />
        </section>
        {/* Tarjeta Costeador de Viajes */}
        <section className="card flex-1 min-w-[320px]">
          <h2 className="title-main mb-8">Costeador de Viajes</h2>
          <Dashboard />
        </section>
      </div>
    </main>
  );
}
