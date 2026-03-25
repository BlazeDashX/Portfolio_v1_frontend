'use client';
// FILE: apps/web/src/components/layout/AppLayout.tsx

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, BarChart2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { useState } from 'react';

const NAV = [
  { href:'/dashboard', label:'Dashboard', Icon:LayoutDashboard },
  { href:'/log',       label:'Log',       Icon:BookOpen        },
  { href:'/routine',   label:'Routine',   Icon:Calendar        },
  { href:'/analytics', label:'Analytics', Icon:BarChart2       },
  { href:'/settings',  label:'Settings',  Icon:Settings        },
] as const;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [hoverLogout, setHoverLogout] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor:'#060610' }}>

      {/* Sidebar */}
      <aside className="flex flex-col shrink-0 py-6"
        style={{ width:'220px', backgroundColor:'#06060E', borderRight:'1px solid #0E0E1C' }}>

        {/* Logo */}
        <div className="px-5 mb-8">
          <span className="text-base font-bold tracking-tight" style={{ color:'#F1F0FF' }}>LifeChrono</span>
          <p className="text-xs mt-0.5" style={{ color:'#2A2A4A' }}>Your 168 hours</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map(({ href, label, Icon }) => {
            const active = path.startsWith(href);
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color:           active ? '#A78BFA' : '#3A3A5A',
                  border:          active ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLElement).style.color = '#9896B8';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#3A3A5A';
                  }
                }}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-3 mt-4 pt-4" style={{ borderTop: '1px solid #0E0E1C' }}>
          {user && (
            <div className="px-2 pb-3">
              <p className="text-xs font-medium truncate" style={{ color: '#6B6B8A' }}>{user.name}</p>
              <p className="text-xs truncate mt-0.5" style={{ color: '#2A2A42', fontSize: '11px' }}>{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{
              backgroundColor: hoverLogout ? 'rgba(248,113,113,0.08)' : 'transparent',
              color: hoverLogout ? '#f87171' : '#3A3A5A',
              border: '1px solid transparent',
            }}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
          <p className="text-xs px-2 mt-2" style={{ color:'#1A1A2E' }}>v0.1 · private beta</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}