'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const menu = [
  { label: 'Home', href: '/#home' },
  { label: 'Tentang', href: '/#profil' },
  { label: 'UMKM', href: '/#umkm' },
  { label: 'Wisata', href: '/#wisata' },
  { label: 'Galeri', href: '/#galeri' },
  { label: 'Berita', href: '/#berita' },
  { label: 'Kontak', href: '/#kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [namaDusun, setNamaDusun] = useState('Dusun')

  useEffect(() => {
    const fetchProfil = async () => {
      const supabase = createClient()

      const { data } = await supabase
        .from('profil_desa')
        .select('nama_desa')
        .limit(1)
        .single()

      if (data?.nama_desa) {
        setNamaDusun(data.nama_desa)
      }
    }

    fetchProfil()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">

        {/* Brand */}
        <Link
          href="/"
          className="flex flex-col justify-center leading-none transition hover:opacity-90"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Website Informasi
          </span>

          <h1 className="mt-1 text-xl font-black uppercase tracking-[0.08em] text-slate-900">
            {namaDusun}
          </h1>

          <div className="mt-2 h-[3px] w-12 rounded-full bg-emerald-600" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                relative
                text-sm
                font-medium
                text-slate-700
                transition
                duration-200
                hover:text-emerald-600
                after:absolute
                after:-bottom-1
                after:left-0
                after:h-0.5
                after:w-0
                after:rounded-full
                after:bg-emerald-600
                after:transition-all
                hover:after:w-full
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="
            rounded-xl
            p-2
            text-slate-700
            transition
            hover:bg-slate-100
            md:hidden
          "
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-emerald-50
                  hover:text-emerald-600
                "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}