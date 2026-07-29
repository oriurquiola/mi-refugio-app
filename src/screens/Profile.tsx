import React from 'react';
import { ArrowLeft, ClipboardList, Sparkles, CalendarCheck, Zap } from 'lucide-react';
import { C } from '../theme';
import { GlassCard } from '../components/GlassCard';
import { PsychologistCTA } from '../components/PsychologistCTA';
import { mockHistory } from '../data';

interface ProfileProps {
  onBack: () => void;
}

const WEEKDAY_LABELS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

// El mes visible en la bitácora se ancla al registro más reciente, así el
// calendario y las estadísticas siempre describen la misma foto de datos mock.
function buildCalendar(anchorISO: string, markedISODates: Set<string>) {
  const anchor = new Date(`${anchorISO}T00:00:00`);
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Lunes

  const cells: Array<{ day: number; isMarked: boolean } | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({ day, isMarked: markedISODates.has(iso) });
  }

  const monthLabel = anchor.toLocaleDateString('es-ES', { month: 'long' });
  return { cells, monthLabel: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1) };
}

function mostFrequentTechnique(): string {
  const counts: Record<string, number> = {};
  for (const session of mockHistory) {
    counts[session.techniqueName] = (counts[session.techniqueName] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
}

export function Profile({ onBack }: ProfileProps) {
  const markedDates = new Set(mockHistory.map(s => s.dateISO));
  const { cells, monthLabel } = buildCalendar(mockHistory[0]?.dateISO ?? new Date().toISOString().slice(0, 10), markedDates);

  const stats = [
    { icon: ClipboardList, label: 'Durante este mes', value: `${mockHistory.length} registros`, color: C.lavender },
    { icon: Sparkles, label: 'Técnica más usada', value: mostFrequentTechnique(), color: C.teal },
    { icon: CalendarCheck, label: 'Último registro', value: mockHistory[0]?.date ?? '—', color: C.amber },
  ];

  return (
    <div className="min-h-screen pt-[32px] px-[20px] pb-[100px] flex flex-col gap-[24px]">
      <div
        className="fixed inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, #0D0A28 0%, #1A1240 30%, #231952 100%)' }}
      />

      {/* Header */}
      <header className="flex flex-col gap-[16px]">
        <button
          onClick={onBack}
          className="w-[44px] h-[44px] rounded-[16px] flex items-center justify-center backdrop-blur-[8px]"
          style={{ backgroundColor: C.glass, border: `1px solid ${C.glassBorder}` }}
        >
          <ArrowLeft size={24} color={C.white} />
        </button>
        <div className="flex items-center gap-[16px]">
          <div
            className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-sans font-[700] text-[16px] text-white shrink-0"
            style={{ backgroundColor: "#352e5d" }}
          >
            MA
          </div>
          <div>
            <h1 className="font-sans font-[800] text-[20px] text-white">María Alejandra</h1>
          </div>
        </div>
      </header>

      {/* Estadísticas */}
      <section className="flex flex-col gap-[12px]">
        <h2 className="font-sans font-[700] text-[15px] text-white">Tus estadísticas</h2>
        <div className="flex gap-[12px]">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <GlassCard key={stat.label} radius="16" padding="md" className="flex-1">
                <div className="flex flex-col gap-[8px] items-start">
                  <div
                    className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}33` }}
                  >
                    <Icon size={16} color={stat.color} />
                  </div>
                  <div className="font-sans font-[800] text-[14px] text-white leading-tight">{stat.value}</div>
                  <div className="font-sans font-[500] text-[10px] leading-tight" style={{ color: C.w40 }}>{stat.label}</div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Bitácora */}
      <section className="flex flex-col gap-[12px]">
        <div>
          <h2 className="font-sans font-[700] text-[15px] text-white">Tu bitácora</h2>
          <p className="font-sans font-[400] text-[12px]" style={{ color: C.w40 }}>
            Días en los que registraste una crisis en {monthLabel}.
          </p>
        </div>
        <GlassCard radius="16" padding="lg">
          <div className="grid grid-cols-7 gap-[6px] mb-[8px]">
            {WEEKDAY_LABELS.map(label => (
              <div key={label} className="text-center font-sans font-[700] text-[9px]" style={{ color: C.w40 }}>
                {label}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-[6px]">
            {cells.map((cell, idx) => (
              <div key={idx} className="aspect-square flex items-center justify-center">
                {cell && (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center font-sans font-[600] text-[11px]"
                    style={{
                      backgroundColor: cell.isMarked ? `${C.coral}33` : 'transparent',
                      color: cell.isMarked ? C.coral : C.w40,
                      border: cell.isMarked ? `1px solid ${C.coral}66` : '1px solid transparent',
                    }}
                  >
                    {cell.day}
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Historial de técnicas */}
      <section className="flex flex-col gap-[12px]">
        <h2 className="font-sans font-[700] text-[15px] text-white">Historial de técnicas recomendadas</h2>
        <div className="flex flex-col gap-[12px]">
          {mockHistory.map(session => (
            <GlassCard key={session.id} radius="16" padding="lg">
              <div className="flex items-center gap-[12px]">
                <div
                  className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${session.color}33` }}
                >
                  <Zap size={18} color={session.color} />
                </div>
                <div className="flex-1">
                  <div className="font-sans font-[700] text-[13px] text-white">{session.techniqueName}</div>
                  <div className="font-sans font-[400] text-[12px]" style={{ color: C.w40 }}>{session.symptomLabel}</div>
                </div>
                <div
                  className="px-[8px] py-[2px] rounded-full text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: `${session.color}2E`, color: session.color }}
                >
                  {session.date}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <PsychologistCTA />
    </div>
  );
}
