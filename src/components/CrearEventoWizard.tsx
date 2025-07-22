import React from 'react';
import { useEventoContext } from '../context/EventoContext';
import PasoDatosBasicosEvento from './PasoDatosBasicosEvento';
import PasoParticipantesEvento from './PasoParticipantesEvento';
import PasoDividirGastosEvento from './PasoDividirGastosEvento';

const pasos = [
  'Datos básicos',
  'Participantes',
  'División de gastos',
];

const CrearEventoWizard: React.FC = () => {
  const { state, dispatch } = useEventoContext();
  const { pasoCreacion, eventoEnCreacion } = state;

  const handleSiguiente = () => {
    dispatch({ type: 'AVANZAR_PASO_CREACION' });
  };
  const handleAnterior = () => {
    dispatch({ type: 'RETROCEDER_PASO_CREACION' });
  };
  const handleCancelar = () => {
    dispatch({ type: 'FINALIZAR_CREACION_EVENTO' });
  };
  const handleFinalizar = () => {
    // Validar datos mínimos
    if (!eventoEnCreacion?.nombreDelEvento || !eventoEnCreacion?.fechaDelEvento || !eventoEnCreacion?.participantes || eventoEnCreacion.participantes.length < 1) {
      alert('Completa todos los datos del evento.');
      return;
    }
    // Si tiene id, es edición; si no, es nuevo
    if (eventoEnCreacion.id) {
      const eventoEditado = {
        id: eventoEnCreacion.id,
        nombreDelEvento: eventoEnCreacion.nombreDelEvento || '',
        fechaDelEvento: eventoEnCreacion.fechaDelEvento || '',
        participantes: eventoEnCreacion.participantes,
        compradorId: eventoEnCreacion.compradorId,
        montoTotal: eventoEnCreacion.montoTotal,
        montosIndividuales: eventoEnCreacion.montosIndividuales,
      };
      dispatch({ type: 'EDITAR_EVENTO', payload: eventoEditado });
    } else {
      const nuevoEvento = {
        id: Date.now().toString(),
        nombreDelEvento: eventoEnCreacion.nombreDelEvento || '',
        fechaDelEvento: eventoEnCreacion.fechaDelEvento || '',
        participantes: eventoEnCreacion.participantes,
        compradorId: eventoEnCreacion.compradorId,
        montoTotal: eventoEnCreacion.montoTotal,
        montosIndividuales: eventoEnCreacion.montosIndividuales,
      };
      dispatch({ type: 'AGREGAR_EVENTO', payload: nuevoEvento });
    }
    dispatch({ type: 'FINALIZAR_CREACION_EVENTO' });
  };

  const renderPaso = () => {
    switch (pasoCreacion) {
      case 0:
        return <PasoDatosBasicosEvento />;
      case 1:
        return <PasoParticipantesEvento />;
      case 2:
        return <PasoDividirGastosEvento />;
      default:
        return null;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title mb-4">Crear Evento</h2>
        <div className="mb-4 text-center">
          Paso {pasoCreacion + 1} de {pasos.length}: <b>{pasos[pasoCreacion]}</b>
        </div>
        {/* Renderizar el componente del paso actual */}
        <div className="my-6">
          {renderPaso()}
        </div>
        <div className="flex gap-3 justify-between mt-6">
          <button className="btn-gray btn-block" onClick={handleCancelar}>Cancelar</button>
          {pasoCreacion > 0 && (
            <button className="btn-blue btn-block" onClick={handleAnterior}>Anterior</button>
          )}
          {pasoCreacion < pasos.length - 1 ? (
            <button className="btn-emerald btn-block" onClick={handleSiguiente}>Siguiente</button>
          ) : (
            <button className="btn-emerald btn-block" onClick={handleFinalizar}>Finalizar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearEventoWizard; 