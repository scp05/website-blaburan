'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import LogoutButton from './LogoutButton'

import {
  LayoutDashboard,
  FileText,
  Images,
  MapPinned,
  Store,
  Users,
  BarChart3,
  Building2,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const menus = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/profil',
    label: 'Profil',
    icon: Building2,
  },
  {
    href: '/admin/statistik',
    label: 'Statistik',
    icon: BarChart3,
  },
  {
    href: '/admin/perangkat',
    label: 'Perangkat',
    icon: Users,
  },
  {
    href: '/admin/berita',
    label: 'Berita',
    icon: FileText,
  },
  {
    href: '/admin/galeri',
    label: 'Galeri',
    icon: Images,
  },
  {
    href: '/admin/wisata',
    label: 'Wisata',
    icon: MapPinned,
  },
  {
    href: '/admin/umkm',
    label: 'UMKM',
    icon: Store,
  },
]

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const [open, setOpen] = useState(false)

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="font-bold text-xl text-slate-900">
            Admin Dusun
          </h1>

          <p className="text-xs text-slate-500">
            Content Management System
          </p>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-2">

          {menus.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  transition

                  ${
                    active
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }
                `}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            )
          })}

        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">

          <div className="hidden lg:block">
            <LogoutButton />
          </div>

         <button
  onClick={() => setOpen(!open)}
  className="
    lg:hidden
    p-2
    rounded-xl
    text-slate-900
    hover:bg-slate-100
    transition
  "
>
  {open ? (
    <X
      size={24}
      className="text-slate-900"
    />
  ) : (
    <Menu
      size={24}
      className="text-slate-900"
    />
  )}
</button>

        </div>

      </div>
            {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">

          <nav className="flex flex-col p-4 gap-2">

            {menus.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition

                    ${
                      active
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}

            <div className="border-t border-slate-200 my-2"></div>

            <button
              onClick={logout}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </nav>

        </div>
      )}

    </header>
  )
}