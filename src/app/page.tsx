"use client";

import React, { useEffect, useState } from "react";
import CreateDinnerModal from "../components/CreateDinnerModal";
import { useRouter } from "next/navigation";
import "./ui.css";
import { Pencil } from "lucide-react";
import Dashboard from "./../pages/Dashboard";

function DinnerDetailModal({ dinner, onClose, onDelete }: { dinner: any, onClose: () => void, onDelete: () => void }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: 520 }}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h3 className="modal-title mb-2">{dinner.title}</h3>
        {dinner.date && <div className="text-center text-gray-500 mb-4">Fecha: {dinner.date}</div>}
        <div className="mb-4">
          <div className="font-bold mb-2">Integrantes:</div>
          <div className="grid grid-cols-[minmax(90px,1fr)_70px_110px_120px] gap-x-3 gap-y-1">
            <div className="font-semibold text-sm">Nombre</div>
            <div className="font-semibold text-sm"> </div>
            <div className="font-semibold text-sm text-right">Gasto</div>
            <div className="font-semibold text-sm text-right">Debe pagar</div>
            {dinner.members.map((name: string, idx: number) => (
              <>
                <div key={"name"+idx} className="member-label flex items-center">
                  {name}
                  {dinner.buyerIdx === idx && (
                    <span className="buyer-badge ml-2" style={{ fontSize: '0.7rem', padding: '0.05rem 0.4rem' }}>Comprador</span>
                  )}
                </div>
                <div key={"badge"+idx}></div>
                <div key={"gasto"+idx} className="text-right font-bold">${dinner.expenses[idx].toFixed(2)}</div>
                <div key={"pagar"+idx} className="pay-label text-right">${(dinner.total / dinner.members.length - dinner.expenses[idx]).toFixed(2)}</div>
              </>
            ))}
          </div>
        </div>
        <div className="total-label mb-4">Total: <span className="total-amount">${dinner.total.toFixed(2)}</span></div>
        {confirm ? (
          <div className="mb-4 text-center">
            <div className="mb-2 font-bold text-danger">¿Seguro que deseas eliminar esta cena?</div>
            <button className="btn-danger btn-block mb-2" onClick={onDelete}>Sí, eliminar</button>
            <button className="btn-gray btn-block" onClick={() => setConfirm(false)}>Cancelar</button>
          </div>
        ) : (
          <button className="btn-danger btn-block" onClick={() => setConfirm(true)}>Eliminar cena</button>
        )}
      </div>
    </div>
  );
}

function DinnerEditModal({ dinner, onClose, onSave }: { dinner: any, onClose: () => void, onSave: (data: any) => void }) {
  const [title, setTitle] = useState(dinner.title);
  const [date, setDate] = useState(dinner.date || "");
  const [members, setMembers] = useState([...dinner.members]);
  const [expenses, setExpenses] = useState([...dinner.expenses].map(e => e.toString()));
  const [buyerIdx, setBuyerIdx] = useState<number|null>(dinner.buyerIdx ?? null);
  const [error, setError] = useState("");

  const handleMemberChange = (idx: number, value: string) => {
    setMembers(members.map((m, i) => (i === idx ? value : m)));
  };
  const handleExpenseChange = (idx: number, value: string) => {
    setExpenses(expenses.map((e, i) => (i === idx ? value : e)));
  };
  const handleSave = () => {
    if (!title.trim()) {
      setError("El nombre de la cena es requerido");
      return;
    }
    if (members.length < 1) {
      setError("Debe haber al menos un integrante");
      return;
    }
    if (members.some((m) => !m.trim())) {
      setError("Todos los integrantes deben tener nombre");
      return;
    }
    setError("");
    onSave({
      ...dinner,
      title: title.trim(),
      date,
      members: members.map(m => m.trim()),
      expenses: expenses.map(e => parseFloat(e) || 0),
      buyerIdx,
      total: expenses.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0),
    });
  };
  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: 520 }}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <h3 className="modal-title mb-2">Editar Cena</h3>
        <div className="mb-4">
          <label className="label">Nombre de la cena <span className="text-danger">*</span></label>
          <input type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="label">Fecha de la cena</label>
          <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="label">Integrantes y gastos</label>
          <div className="space-y-2">
            {members.map((member, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_90px_70px] gap-2 items-center">
                <input
                  type="text"
                  className="input"
                  value={member}
                  onChange={e => handleMemberChange(idx, e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="input"
                  value={expenses[idx]}
                  onChange={e => handleExpenseChange(idx, e.target.value)}
                  placeholder="Gasto"
                />
                <input
                  type="radio"
                  name="buyer"
                  checked={buyerIdx === idx}
                  onChange={() => setBuyerIdx(idx)}
                  className="checkbox-square"
                  style={{ width: 22, height: 22 }}
                  aria-label="Comprador"
                />
              </div>
            ))}
          </div>
        </div>
        {error && <div className="text-danger text-sm mb-2 text-center">{error}</div>}
        <button className="btn-emerald btn-block mb-2" onClick={handleSave}>Guardar cambios</button>
        <button className="btn-gray btn-block" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dinners, setDinners] = useState<any[]>([]);
  const router = useRouter();
  const [detail, setDetail] = useState<any|null>(null);
  const [edit, setEdit] = useState<any|null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("dinners");
      if (data) setDinners(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const onFocus = () => {
      const data = localStorage.getItem("dinners");
      if (data) setDinners(JSON.parse(data));
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleSaveDinner = (data: { title: string; date?: string; membersCount: number }) => {
    setModalOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("newDinner", JSON.stringify(data));
    }
    router.push("/crear-cena");
  };

  return (
    <main className="min-h-screen bg-gradient-app flex flex-col items-center py-10 px-4 font-fun">
      <h1 className="title-main mb-8">
        <span className="inline-block animate-bounce">🍽️</span>
        Costeador de Cenas y Viajes
      </h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center">
        {/* Tarjeta Costeador de Cenas */}
        <section className="card flex-1 min-w-[320px]">
          <h2 className="title-section mb-4">Costeador de Cenas</h2>
          <div className="flex justify-center mb-6">
        <button
          className="btn-emerald"
          onClick={() => setModalOpen(true)}
        >
          + Crear Cena
        </button>
      </div>
      <CreateDinnerModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveDinner} />
      <section className="section">
            <h3 className="title-section">Historial de Cenas</h3>
        {dinners.length === 0 ? (
              <div className="text-muted">No hay cenas registradas aún.</div>
        ) : (
          <ul className="space-y-3">
            {dinners.map((dinner) => (
              <li key={dinner.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow p-3 cursor-pointer hover:bg-blue-50 transition group">
                <div onClick={() => setDetail(dinner)} className="flex-1 cursor-pointer">
                  <span className="font-bold text-lg text-blue-700">{dinner.title}</span>
                  {dinner.date && <span className="ml-3 text-gray-500 text-sm">{dinner.date}</span>}
                </div>
                <div className="font-bold text-emerald-700 text-lg mt-2 md:mt-0">Total: ${dinner.total.toFixed(2)}</div>
                <button
                  className="ml-4 text-blue-600 hover:text-blue-800 transition flex items-center opacity-80 group-hover:opacity-100"
                  onClick={e => { e.stopPropagation(); setEdit(dinner); }}
                  aria-label="Editar cena"
                >
                  <Pencil size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {detail && (
        <DinnerDetailModal
          dinner={detail}
          onClose={() => setDetail(null)}
          onDelete={() => {
            setDinners(dinners.filter(d => d.id !== detail.id));
            localStorage.setItem("dinners", JSON.stringify(dinners.filter(d => d.id !== detail.id)));
            setDetail(null);
          }}
        />
      )}
      {edit && (
        <DinnerEditModal
          dinner={edit}
          onClose={() => setEdit(null)}
          onSave={data => {
            const updated = dinners.map(d => d.id === data.id ? data : d);
            setDinners(updated);
            localStorage.setItem("dinners", JSON.stringify(updated));
            setEdit(null);
          }}
        />
      )}
        </section>
        {/* Tarjeta Costeador de Viajes */}
        <section className="card flex-1 min-w-[320px]">
          <h2 className="title-section mb-4">Costeador de Viajes</h2>
          <Dashboard />
        </section>
      </div>
    </main>
  );
}
