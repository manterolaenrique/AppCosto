"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTripContext } from '../../../context/TripContext';
import TripDetails from '../../../components/TripDetails';
import '../../ui.css';

const TripPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { state } = useTripContext();
  const viaje = params?.id ? state.viajes.find(v => v.id === params.id) : undefined;

  if (!viaje) {
    return (
      <div className="min-h-screen bg-gradient-app flex flex-col items-center justify-center py-10 px-4 font-fun">
        <div className="card text-center">
          <h2 className="title-section text-red-600">Viaje no encontrado</h2>
          <p className="text-muted mb-4">El viaje que buscas no existe o ha sido eliminado.</p>
          <button className="btn-emerald" onClick={() => router.push('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-app flex flex-col items-center py-10 px-4 font-fun">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
            <span className="inline-block animate-bounce text-5xl">✈️</span>
            {viaje.nombreDelViaje}
          </h1>
        </div>

        {/* Botón de navegación */}
        <div className="mb-8">
          <button 
            className="btn-blue" 
            onClick={() => router.push('/')}
            style={{ width: 'auto', padding: '0.75rem 2rem' }}
          >
            ← Volver al Dashboard
          </button>
        </div>

        {/* Información del viaje */}
        <div className="card mb-6 w-full">
          <div className="text-center mb-4">
            <h2 className="title-section">Detalles del Viaje</h2>
            <p className="text-gray-600">Fecha: {viaje.fechaDelViaje}</p>
            <p className="text-gray-600">Integrantes: {viaje.integrantes.length}</p>
          </div>
        </div>

        {/* Componente de detalles */}
        <div className="w-full">
          <TripDetails viaje={viaje} />
        </div>
      </div>
    </div>
  );
};

export default TripPage; 