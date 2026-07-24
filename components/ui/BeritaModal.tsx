'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface Berita {
  id: string
  judul: string
  konten: string
  gambar_url?: string
  created_at: string
}

export default function BeritaModal({ berita }: { berita: Berita }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-emerald-600 font-medium hover:text-emerald-700 transition"
      >
        Baca Selengkapnya →
      </button>

      {open && (
        <div className="fixed inset-0 z-999 bg-black/60 flex items-center justify-center p-5">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100"
            >
              <X size={22} />
            </button>

            {berita.gambar_url && (
              <img
                src={berita.gambar_url}
                alt={berita.judul}
                className="w-full h-72 object-cover"
              />
            )}

            <div className="p-8">

              <p className="text-sm text-emerald-600 mb-3">
                {new Date(berita.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {berita.judul}
              </h2>

              <div className="text-slate-600 leading-8 whitespace-pre-line">
                {berita.konten}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}