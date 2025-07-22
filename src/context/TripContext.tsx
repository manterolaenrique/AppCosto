"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos
export type Gasto = {
  motivo: string;
  monto: number;
  fotoComprobante?: string;
  integranteId: string;
};

export type Integrante = {
  id: string;
  nombre: string;
  gastos: Gasto[];
};

export type Viaje = {
  id: string;
  nombreDelViaje: string;
  fechaDelViaje: string;
  integrantes: Integrante[];
};

// Estado y acciones
interface TripState {
  viajes: Viaje[];
}

type TripAction =
  | { type: 'AGREGAR_VIAJE'; payload: Viaje }
  | { type: 'EDITAR_VIAJE'; payload: Viaje }
  | { type: 'AGREGAR_GASTO'; payload: { viajeId: string; gasto: Gasto } }
  | { type: 'ELIMINAR_VIAJE'; payload: string };

const initialState: TripState = {
  viajes: [],
};

function tripReducer(state: TripState, action: TripAction): TripState {
  switch (action.type) {
    case 'AGREGAR_VIAJE':
      return { ...state, viajes: [...state.viajes, action.payload] };
    case 'EDITAR_VIAJE':
      return {
        ...state,
        viajes: state.viajes.map(v => v.id === action.payload.id ? action.payload : v),
      };
    case 'AGREGAR_GASTO':
      return {
        ...state,
        viajes: state.viajes.map(v =>
          v.id === action.payload.viajeId
            ? {
                ...v,
                integrantes: v.integrantes.map(i =>
                  i.id === action.payload.gasto.integranteId
                    ? { ...i, gastos: [...i.gastos, action.payload.gasto] }
                    : i
                ),
              }
            : v
        ),
      };
    case 'ELIMINAR_VIAJE':
      return {
        ...state,
        viajes: state.viajes.filter(v => v.id !== action.payload),
      };
    default:
      return state;
  }
}

const TripContext = createContext<{
  state: TripState;
  dispatch: React.Dispatch<TripAction>;
} | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);
  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  );
};

export function useTripContext() {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTripContext debe usarse dentro de TripProvider');
  return context;
} 