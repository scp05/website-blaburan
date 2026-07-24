'use client'

import Link from 'next/link'
import { CalendarDays, User, ArrowRight } from 'lucide-react'

interface Berita {
  id: string
  judul: string
  slug: string
  konten: string
  gambar_url?: string | null
  penulis?: string | null
  created_at: string
}

export default function BeritaCard({
  berita,
}: {
  berita: Berita
}) {
  return (
    <Link
      href={`/berita/${berita.slug}`}
      className="group block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-56 overflow-hidden bg-slate-100">
        <img
          src={berita.gambar_url || '/placeholder.jpg'}
          alt={berita.judul}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex h-[250px] flex-col p-6">

        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>
              {new Date(berita.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          {berita.penulis && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{berita.penulis}</span>
            </div>
          )}

        </div>

        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900">
          {berita.judul}
        </h3>

        <p className="line-clamp-3 flex-1 leading-7 text-slate-500">
          {berita.konten}
        </p>

        <div className="mt-6 flex items-center gap-2 font-medium text-emerald-600 transition group-hover:gap-3">
          <span>Baca Selengkapnya</span>
          <ArrowRight size={18} />
        </div>

      </div>
    </Link>
  )
}