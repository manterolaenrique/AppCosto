"use client";
import React from "react";
import EventosDashboard from "./eventos/page";
import Dashboard from "../pages/Dashboard";
import "./ui.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-app flex flex-col items-center py-10 px-4 font-fun">
      <h1 className="title-main mb-8">
        <span className="inline-block animate-bounce">🍽️</span>
        Costeador de Cenas y Viajes
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
