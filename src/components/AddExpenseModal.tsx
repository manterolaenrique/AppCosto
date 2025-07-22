import React, { useState } from 'react';
import '../app/ui.css';

interface AddExpenseModalProps {
  abierto: boolean;
  onClose: () => void;
  integrantes: { id: string; nombre: string }[];
  onGuardar: (gasto: { motivo: string; monto: number; integranteId: string; fotoComprobante?: string }) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ abierto, onClose, integrantes, onGuardar }) => {
  const [motivo, setMotivo] = useState('');
  const [monto, setMonto] = useState('');
  const [integranteId, setIntegranteId] = useState(integrantes[0]?.id || '');
  const [foto, setFoto] = useState<File | null>(null);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (integrantes.length > 0) setIntegranteId(integrantes[0].id);
  }, [integrantes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivo.trim() || !monto || !integranteId) {
      setError('Todos los campos obligatorios');
      return;
    }
    let fotoComprobante: string | undefined = undefined;
    if (foto) {
      const reader = new FileReader();
      reader.onload = () => {
        fotoComprobante = reader.result as string;
        onGuardar({ motivo, monto: parseFloat(monto), integranteId, fotoComprobante });
      };
      reader.readAsDataURL(foto);
    } else {
      onGuardar({ motivo, monto: parseFloat(monto), integranteId });
    }
    setError('');
    setMotivo('');
    setMonto('');
    setFoto(null);
  };

  if (!abierto) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="modal-title">Agregar gasto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">Integrante <span className="text-danger">*</span></label>
            <select 
              className="input" 
              value={integranteId} 
              onChange={e => setIntegranteId(e.target.value)} 
              required
            >
              {integrantes.map(i => (
                <option key={i.id} value={i.id}>{i.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="label">Motivo <span className="text-danger">*</span></label>
            <input 
              className="input" 
              value={motivo} 
              onChange={e => setMotivo(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="label">Monto <span className="text-danger">*</span></label>
            <input 
              type="number" 
              min={0} 
              className="input" 
              value={monto} 
              onChange={e => setMonto(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="label">Foto comprobante (opcional)</label>
            <input 
              type="file" 
              accept="image/*" 
              className="input" 
              onChange={e => setFoto(e.target.files?.[0] || null)} 
            />
          </div>
          {error && <div className="text-danger text-sm mb-4 text-center">{error}</div>}
          <div className="flex gap-3">
            <button type="submit" className="btn-emerald btn-block">
              Agregar
            </button>
            <button type="button" className="btn-gray btn-block" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal; 