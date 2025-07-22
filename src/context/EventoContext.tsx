"use client";
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos
export type GastoEvento = {
  motivo: string;
  monto: number;
  fotoComprobante?: string;
  participanteId: string;
};

export type Participante = {
  id: string;
  nombre: string;
  gastos: GastoEvento[];
};

export type Evento = {
  id: string;
  nombreDelEvento: string;
  fechaDelEvento: string;
  participantes: Participante[];
  compradorId?: string;
  montoTotal?: number;
  montosIndividuales?: number[];
};

// Estado y acciones
interface EventoState {
  eventos: Evento[];
  eventoEnCreacion: (Partial<Evento> & { id?: string }) | null;
  pasoCreacion: number;
}

type EventoAction =
  | { type: 'AGREGAR_EVENTO'; payload: Evento }
  | { type: 'EDITAR_EVENTO'; payload: Evento }
  | { type: 'ELIMINAR_EVENTO'; payload: string }
  | { type: 'AGREGAR_GASTO_EVENTO'; payload: { eventoId: string; gasto: GastoEvento } }
  | { type: 'INICIAR_CREACION_EVENTO' }
  | { type: 'INICIAR_EDICION_EVENTO'; payload: Evento }
  | { type: 'ACTUALIZAR_EVENTO_EN_CREACION'; payload: Partial<Evento> }
  | { type: 'AVANZAR_PASO_CREACION' }
  | { type: 'RETROCEDER_PASO_CREACION' }
  | { type: 'FINALIZAR_CREACION_EVENTO' };

const initialState: EventoState = {
  eventos: [],
  eventoEnCreacion: null,
  pasoCreacion: 0,
};

function eventoReducer(state: EventoState, action: EventoAction): EventoState {
  switch (action.type) {
    case 'AGREGAR_EVENTO':
      return { ...state, eventos: [...state.eventos, action.payload] };
    case 'EDITAR_EVENTO':
      return {
        ...state,
        eventos: state.eventos.map(e => e.id === action.payload.id ? action.payload : e),
      };
    case 'ELIMINAR_EVENTO':
      return {
        ...state,
        eventos: state.eventos.filter(e => e.id !== action.payload),
      };
    case 'AGREGAR_GASTO_EVENTO':
      return {
        ...state,
        eventos: state.eventos.map(e =>
          e.id === action.payload.eventoId
            ? {
                ...e,
                participantes: e.participantes.map(p =>
                  p.id === action.payload.gasto.participanteId
                    ? { ...p, gastos: [...p.gastos, action.payload.gasto] }
                    : p
                ),
              }
            : e
        ),
      };
    case 'INICIAR_CREACION_EVENTO':
      return {
        ...state,
        eventoEnCreacion: {},
        pasoCreacion: 0,
      };
    case 'INICIAR_EDICION_EVENTO':
      return {
        ...state,
        eventoEnCreacion: { ...action.payload },
        pasoCreacion: 0,
      };
    case 'ACTUALIZAR_EVENTO_EN_CREACION':
      return {
        ...state,
        eventoEnCreacion: { ...state.eventoEnCreacion, ...action.payload },
      };
    case 'AVANZAR_PASO_CREACION':
      return {
        ...state,
        pasoCreacion: state.pasoCreacion + 1,
      };
    case 'RETROCEDER_PASO_CREACION':
      return {
        ...state,
        pasoCreacion: Math.max(0, state.pasoCreacion - 1),
      };
    case 'FINALIZAR_CREACION_EVENTO':
      return {
        ...state,
        eventoEnCreacion: null,
        pasoCreacion: 0,
      };
    default:
      return state;
  }
}

const EventoContext = createContext<{
  state: EventoState;
  dispatch: React.Dispatch<EventoAction>;
} | undefined>(undefined);

export const EventoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(eventoReducer, initialState);
  return (
    <EventoContext.Provider value={{ state, dispatch }}>
      {children}
    </EventoContext.Provider>
  );
};

export function useEventoContext() {
  const context = useContext(EventoContext);
  if (!context) throw new Error('useEventoContext debe usarse dentro de EventoProvider');
  return context;
} 