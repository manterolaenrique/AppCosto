"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import "../ui.css";

interface DinnerData {
  title: string;
  date?: string;
  membersCount: number;
}

export default function CrearCenaPage() {
  const [dinner, setDinner] = useState<DinnerData | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [showSavedOnBack, setShowSavedOnBack] = useState(false);
  const [buyerIdx, setBuyerIdx] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("newDinner");
    if (data) {
      const parsed: DinnerData = JSON.parse(data);
      setDinner(parsed);
      setMembers(Array.from({ length: parsed.membersCount }, (_, i) => `Integrante ${i + 1}`));
    } else {
      router.replace("/");
    }
  }, [router]);

  const handleMemberChange = (idx: number, value: string) => {
    setMembers(members.map((m, i) => (i === idx ? value : m)));
  };

  const handleAddMember = () => {
    setMembers([...members, `Integrante ${members.length + 1}`]);
  };

  const handleSaveMembers = () => {
    // Aquí podrías guardar en localStorage, backend, etc.
    sessionStorage.setItem("dinnerMembers", JSON.stringify(members));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBuyerChange = (idx: number) => {
    setBuyerIdx(idx);
  };

  const handleRemoveMember = (idx: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== idx));
      if (buyerIdx === idx) setBuyerIdx(null);
      else if (buyerIdx !== null && buyerIdx > idx) setBuyerIdx(buyerIdx - 1);
    }
  };

  if (!dinner) return null;

  return (
    <main className="min-h-screen bg-gradient-app flex flex-col items-center py-10 px-4 font-fun">
      <div className="card">
        <h1 className="title-main">
          <span className="inline-block animate-bounce">🍽️</span>
          {dinner.title}
        </h1>
        {dinner.date && (
          <div className="text-center text-gray-500 mb-6">Fecha: {dinner.date}</div>
        )}
        <h2 className="title-section">Integrantes</h2>
        <div className="mb-2 grid grid-cols-[1fr_110px] gap-2 items-center px-2">
          <span></span>
          <span className="title-column">Comprador</span>
        </div>
        <div className="space-y-3 mb-6">
          {members.map((member, idx) => (
            <div key={idx} className="grid grid-cols-[40px_1fr_110px] gap-2 items-center">
              <button
                type="button"
                className="flex items-center justify-center text-red-500 hover:text-red-700 transition text-xl"
                style={{ visibility: members.length > 1 ? 'visible' : 'hidden' }}
                onClick={() => handleRemoveMember(idx)}
                aria-label="Eliminar integrante"
              >
                <X size={20} />
              </button>
              <input
                type="text"
                className="input max-w-xs justify-self-start"
                value={member}
                onChange={e => handleMemberChange(idx, e.target.value)}
                placeholder={`Nombre del integrante ${idx + 1}`}
                required
              />
              <div className="flex justify-center items-center h-full">
                <input
                  type="checkbox"
                  checked={buyerIdx === idx}
                  onChange={() => handleBuyerChange(idx)}
                  className="checkbox-square"
                  style={{ boxShadow: buyerIdx === idx ? '0 0 0 2px #2563eb' : undefined }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-6">
          <button
            className="btn-emerald flex items-center justify-center gap-2"
            style={{ maxWidth: 340 }}
            onClick={handleAddMember}
          >
            <span>+ Agregar integrante</span>
          </button>
        </div>
        {showSavedOnBack && <div className="text-green-600 text-center mb-4 font-semibold">¡Nombres guardados!</div>}
        <button
          className="btn-blue btn-block mb-4"
          onClick={() => {
            sessionStorage.setItem("dinnerMembers", JSON.stringify(members));
            sessionStorage.setItem("dinnerBuyerIdx", buyerIdx !== null ? buyerIdx.toString() : "");
            router.push("/costos-cena");
          }}
        >
          Continuar a costos
        </button>
        <button
          className="btn-emerald btn-block"
          onClick={() => {
            handleSaveMembers();
            setShowSavedOnBack(true);
            setTimeout(() => {
              setShowSavedOnBack(false);
              router.push("/");
            }, 1500);
          }}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
} 