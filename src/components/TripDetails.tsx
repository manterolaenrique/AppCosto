import React from 'react';
import { Viaje } from '../context/TripContext';
import '../app/ui.css';

interface TripDetailsProps {
  viaje: Viaje;
}

const TripDetails: React.FC<TripDetailsProps> = ({ viaje }) => {
  // Calcular totales
  const totalGastos = viaje.integrantes.reduce((total, integrante) => {
    return total + integrante.gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
  }, 0);

  const gastoPorPersona = viaje.integrantes.length > 0 ? totalGastos / viaje.integrantes.length : 0;

  // Calcular saldos de cada integrante
  const saldos = viaje.integrantes.map(integrante => {
    const gastoTotal = integrante.gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    const debe = gastoPorPersona - gastoTotal;
    return {
      integrante,
      gastoTotal,
      debe,
      estado: debe > 0 ? 'debe' : debe < 0 ? 'le_deben' : 'equilibrado'
    };
  });

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Resumen de gastos */}
      <div className="card w-full">
        <h3 className="title-section">Resumen de Gastos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">${totalGastos.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total gastado</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">${gastoPorPersona.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Por persona</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">{viaje.integrantes.length}</div>
            <div className="text-sm text-gray-600">Integrantes</div>
          </div>
        </div>
      </div>

      {/* Detalle por integrante */}
      <div className="card w-full">
        <h3 className="title-section">Gastos por Integrante</h3>
        <div className="space-y-4">
          {saldos.map(({ integrante, gastoTotal, debe, estado }) => (
            <div key={integrante.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-blue-700">{integrante.nombre}</h4>
                  <div className="text-sm text-gray-600">
                    Gastos: ${gastoTotal.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    estado === 'debe' ? 'text-red-600' : 
                    estado === 'le_deben' ? 'text-green-600' : 
                    'text-gray-600'
                  }`}>
                    {estado === 'debe' ? `Debe: $${debe.toFixed(2)}` :
                     estado === 'le_deben' ? `Le deben: $${Math.abs(debe).toFixed(2)}` :
                     'Equilibrado'}
                  </div>
                </div>
              </div>
              
              {/* Lista de gastos individuales */}
              {integrante.gastos.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Gastos individuales:</div>
                  <div className="space-y-1">
                    {integrante.gastos.map((gasto, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{gasto.motivo}</span>
                        <span className="font-semibold text-black">${gasto.monto.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de saldos */}
      <div className="card w-full">
        <h3 className="title-section">Resumen de Saldos</h3>
        <div className="space-y-3">
          {saldos.filter(s => s.estado !== 'equilibrado').map(({ integrante, debe, estado }) => (
            <div key={integrante.id} className={`p-3 rounded-lg ${
              estado === 'debe' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-black">{integrante.nombre}</span>
                <span className={`font-bold ${
                  estado === 'debe' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {estado === 'debe' ? `Debe $${debe.toFixed(2)}` : `Le deben $${Math.abs(debe).toFixed(2)}`}
                </span>
              </div>
            </div>
          ))}
          {saldos.every(s => s.estado === 'equilibrado') && (
            <div className="text-center text-green-600 font-semibold">
              ¡Todos los saldos están equilibrados! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails; 