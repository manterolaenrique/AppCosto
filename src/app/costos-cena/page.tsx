"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CostosCenaPage() {
  const [dinner, setDinner] = useState<any>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [cost, setCost] = useState("");
  const [expenses, setExpenses] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [buyerIdx, setBuyerIdx] = useState<number | null>(null);
  const [rounded, setRounded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const dinnerData = sessionStorage.getItem("newDinner");
    const membersData = sessionStorage.getItem("dinnerMembers");
    const buyerData = sessionStorage.getItem("dinnerBuyerIdx");
    if (dinnerData && membersData) {
      setDinner(JSON.parse(dinnerData));
      const parsedMembers = JSON.parse(membersData);
      setMembers(parsedMembers);
      setExpenses(Array(parsedMembers.length).fill("0"));
      if (buyerData && buyerData !== "") setBuyerIdx(Number(buyerData));
    } else {
      router.replace("/");
    }
  }, [router]);

  const handleExpenseChange = (idx: number, value: string) => {
    const val = value.replace(/[^\d.]/g, "");
    setExpenses(expenses.map((e, i) => (i === idx ? val : e)));
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  const totalCost = totalExpenses;
  const perPerson = members.length > 0 ? totalCost / members.length : 0;

  const saldoPendiente = totalCost - totalExpenses;

  const getToPay = (idx: number) => {
    const gasto = parseFloat(expenses[idx]) || 0;
    const value = perPerson - gasto;
    if (rounded) return Math.ceil(value).toFixed(0);
    return value.toFixed(2);
  };

  const handleSave = () => {
    setError("");
    // Guardar la cena en localStorage
    const cena = {
      id: Date.now(),
      title: dinner.title,
      date: dinner.date,
      members,
      expenses: expenses.map(e => parseFloat(e) || 0),
      buyerIdx,
      total: totalCost,
    };
    const prev = JSON.parse(localStorage.getItem("dinners") || "[]");
    localStorage.setItem("dinners", JSON.stringify([cena, ...prev]));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/");
    }, 1200);
  };

  if (!dinner || members.length === 0) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 flex flex-col items-center py-10 px-4 font-fun">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center flex items-center justify-center gap-2">
          <span className="inline-block animate-bounce">🍽️</span>
          {dinner.title}
        </h1>
        {dinner.date && (
          <div className="text-center text-gray-500 mb-6">Fecha: {dinner.date}</div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Costo total de la cena <span className="text-red-500">*</span></label>
          <input
            type="number"
            min={0}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-gray-100 cursor-not-allowed"
            value={totalCost.toFixed(2)}
            readOnly
            tabIndex={-1}
          />
        </div>
        <h2 className="text-xl font-bold text-emerald-700 mb-4 text-center">Gastos individuales</h2>
        <div className="space-y-3 mb-6">
          {members.map((member, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="flex-1 text-black font-semibold">
                {member}
                {buyerIdx === idx && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-200 text-blue-800 rounded text-xs font-bold">Comprador</span>
                )}
              </span>
              <input
                type="number"
                min={0}
                className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                value={expenses[idx]}
                onChange={e => handleExpenseChange(idx, e.target.value)}
                placeholder="Gasto"
              />
              <span className="text-sm text-gray-500">Debe pagar: <span className="font-bold text-blue-700">${getToPay(idx)}</span></span>
            </div>
          ))}
        </div>
        <div className="mb-4 text-center">
          <div className="text-gray-700">Total de gastos individuales: <span className="font-bold">${totalExpenses.toFixed(2)}</span></div>

        </div>
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <button
          className="btn-blue btn-block mb-4"
          onClick={() => setRounded(r => !r)}
        >
          {rounded ? "Quitar redondeo" : "Redondear"}
        </button>
        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition mb-4"
          onClick={handleSave}
        >
          Guardar cena
        </button>
        {saved && <div className="text-green-600 text-center mb-4 font-semibold">¡Cena guardada!</div>}
        <button
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
          onClick={() => router.push("/")}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
} 