'use client';
// FILE: apps/web/src/components/log/GapFillerBanner.tsx
// Phase 3 — Gap Filler banner. Shows when unlogged time gaps are detected today.

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Clock, Plus, X, Zap, Waves, Moon, Minus } from 'lucide-react';

const CAT_COLOR: Record<string, string> = {
  productive: '#10B981',
  leisure: '#F59E0B',
  restoration: '#06B6D4',
  neutral: '#64748B',
};
const CAT_ICON: Record<string, React.ElementType> = {
  productive: Zap, leisure: Waves, restoration: Moon, neutral: Minus,
};

function fmtDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

function fmtTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`;
}

function timeOfDay(gapStart: string): string {
  const h = parseInt(gapStart.split(':')[0], 10);
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

interface Gap {
  gapStart: string;
  gapEnd: string;
  gapMinutes: number;
  suggestions: { title: string; category: string; frequency: number }[];
}

export default function GapFillerBanner({
  dateStr,
  onSelect,
}: {
  dateStr: string;
  onSelect: (task: any) => void;
}) {
  const { data: gaps = [] } = useQuery<Gap[]>({
    queryKey: ['gaps', dateStr],
    queryFn: () => api.get(`/schedule-templates/gaps?date=${dateStr}`).then(r => r.data),
    staleTime: 2 * 60_000,
    refetchInterval: 5 * 60_000,
  });

  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = (gaps as Gap[]).filter(g => !dismissed.has(g.gapStart));
  if (!visible.length) return null;

  return (
    <div className="space-y-2">
      {visible.map(gap => {
        const tod = timeOfDay(gap.gapStart);
        return (
          <div
            key={gap.gapStart}
            className="flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{
              backgroundColor: 'rgba(100,116,139,0.05)',
              border: '1px solid rgba(100,116,139,0.15)',
            }}
          >
            {/* Icon */}
            <Clock
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: '#4A4A6A' }}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs leading-relaxed" style={{ color: '#6B6B8A' }}>
                <span style={{ color: '#9896B8' }}>{fmtDuration(gap.gapMinutes)}</span> unaccounted
                this {tod}{' '}
                <span style={{ color: '#3A3A5A' }}>
                  ({fmtTime(gap.gapStart)} – {fmtTime(gap.gapEnd)})
                </span>
              </p>

              {/* Quick-add chips */}
              {gap.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {gap.suggestions.map((s, i) => {
                    const color = CAT_COLOR[s.category] ?? '#64748B';
                    const Icon = CAT_ICON[s.category] ?? Minus;
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          onSelect({
                            title: s.title,
                            category: s.category,
                            defaultDuration: Math.min(gap.gapMinutes, 60),
                          })
                        }
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all"
                        style={{
                          backgroundColor: `${color}10`,
                          border: `1px solid ${color}25`,
                          color,
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = `${color}22`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = `${color}10`;
                        }}
                      >
                        <Icon className="w-2.5 h-2.5 shrink-0" />
                        {s.title}
                        <Plus className="w-2.5 h-2.5 shrink-0 ml-0.5 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(prev => new Set([...prev, gap.gapStart]))}
              style={{ color: '#2A2A42' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#6B6B8A')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#2A2A42')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
