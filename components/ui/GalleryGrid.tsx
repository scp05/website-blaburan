'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type GalleryItem = {
  id: string
  gambar_url: string
  judul?: string | null
  kategori?: string | null
}

export default function GalleryGrid({
  images,
}: {
  images: GalleryItem[]
}) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null)
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <>
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-5
        "
      >
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelected(image)}
            className="
              group
              cursor-pointer
              overflow-hidden
              rounded-3xl
              bg-white
              border
              border-slate-200
              shadow-sm
              hover:shadow-lg
              transition
            "
          >
            <img
              src={image.gambar_url}
              alt={image.judul ?? ''}
              loading="lazy"
              className="
                w-full
                h-40
                md:h-52
                lg:h-60
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-sm
            p-4
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-5xl
              rounded-3xl
              overflow-hidden
              bg-white
              shadow-2xl
            "
          >
            <button
              onClick={() => setSelected(null)}
              className="
                absolute
                top-4
                right-4
                z-20

                w-10
                h-10

                rounded-full

                bg-white/90
                hover:bg-white

                flex
                items-center
                justify-center

                transition
              "
            >
              <X size={20} />
            </button>

            <img
              src={selected.gambar_url}
              alt={selected.judul ?? ''}
              className="
                w-full
                max-h-[75vh]
                object-contain
                bg-black
              "
            />

            <div className="p-6">

              {selected.kategori && (
                <>
                  <p className="text-xs uppercase tracking-widest font-semibold text-emerald-600">
                    Kategori
                  </p>

                  <p className="mt-1 text-slate-700">
                    {selected.kategori}
                  </p>
                </>
              )}

              {selected.judul && (
                <>
                  <p className="mt-5 text-xs uppercase tracking-widest font-semibold text-emerald-600">
                    Judul
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-slate-900">
                    {selected.judul}
                  </h2>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}