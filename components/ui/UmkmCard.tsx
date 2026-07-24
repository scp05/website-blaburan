'use client'

import { useState } from 'react'
import Modal from './Modal'

interface Umkm {
  id: string
  nama_usaha: string
  kategori: string
  deskripsi: string
  foto_url: string
}

export default function UmkmCard({
  umkm,
}: {
  umkm: Umkm
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="
          group
          cursor-pointer
          overflow-hidden
          rounded-2xl
          md:rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
        "
      >
        {/* Foto */}
        <div className="aspect-square overflow-hidden bg-slate-100">
          {umkm.foto_url && (
            <img
              src={umkm.foto_url}
              alt={umkm.nama_usaha}
              className="
                w-full
                h-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />
          )}
        </div>

        {/* Content */}
        <div className="p-3 md:p-6">
          <span className="text-[11px] md:text-sm font-medium text-emerald-600">
            {umkm.kategori}
          </span>

          <h3 className="mt-1 text-sm md:text-xl font-semibold text-slate-900 line-clamp-2">
            {umkm.nama_usaha}
          </h3>

          <p className="mt-2 text-xs md:text-base leading-5 md:leading-7 text-slate-500 line-clamp-2 md:line-clamp-3">
            {umkm.deskripsi}
          </p>

          <button className="mt-3 md:mt-6 text-xs md:text-base font-medium text-emerald-600 hover:text-emerald-700 transition">
            Lihat Detail →
          </button>
        </div>
      </article>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* Foto ukuran asli */}
        {umkm.foto_url && (
          <div className="bg-slate-100 flex justify-center p-4">
            <img
              src={umkm.foto_url}
              alt={umkm.nama_usaha}
              className="
                max-h-[70vh]
                max-w-full
                w-auto
                rounded-2xl
                object-contain
              "
            />
          </div>
        )}

        {/* Detail */}
        <div className="p-5 md:p-8">
          <span className="text-sm font-medium text-emerald-600">
            {umkm.kategori}
          </span>

          <h2 className="mt-2 mb-5 text-2xl md:text-3xl font-bold text-slate-900">
            {umkm.nama_usaha}
          </h2>

          <p className="text-sm md:text-base leading-7 text-slate-600 whitespace-pre-line">
            {umkm.deskripsi}
          </p>
        </div>
      </Modal>
    </>
  )
}