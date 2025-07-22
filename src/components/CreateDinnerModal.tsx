"use client";
import React, { useState } from "react";
import "../app/ui.css";

interface CreateDinnerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; date?: string; membersCount: number }) => void;
}

export default function CreateDinnerModal({ open, onClose, onSave }: CreateDinnerModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [membersCount, setMembersCount] = useState(1);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      setError("El nombre de la cena es requerido");
      return;
    }
    if (membersCount < 1) {
      setError("Debe haber al menos un integrante");
      return;
    }
    setError("");
    onSave({ title: title.trim(), date: date || undefined, membersCount });
    setTitle("");
    setDate("");
    setMembersCount(1);
  };

  const getToday = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  };

  React.useEffect(() => {
    if (open) {
      setDate(getToday());
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h3 className="modal-title">Crear Nueva Cena</h3>
        <div className="mb-4">
          <label className="label">Nombre de la cena <span className="text-danger">*</span></label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ej: Cena de amigos"
            required
          />
        </div>
        <div className="mb-4">
          <label className="label">Fecha de la cena</label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="label">Cantidad de integrantes <span className="text-danger">*</span></label>
          <input
            type="number"
            min={1}
            className="input"
            value={membersCount}
            onChange={e => setMembersCount(Math.max(1, Number(e.target.value)))}
            required
          />
        </div>
        {error && <div className="text-danger text-sm mb-2 text-center">{error}</div>}
        <button
          className="btn-emerald btn-block"
          onClick={handleSave}
        >
          Guardar Cena
        </button>
      </div>
    </div>
  );
} 