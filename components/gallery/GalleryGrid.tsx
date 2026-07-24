'use client'

import { useMemo, useState } from 'react'

import GalleryCard from './GalleryCard'
import GalleryModal from './GalleryModal'

interface GalleryItem {
  id: string
  gambar_url: string
  judul?: string | null
  kategori?: string | null
}

interface GalleryGridProps {
  images: GalleryItem[]
}

export default function GalleryGrid({
  images,
}: GalleryGridProps) {

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null)

  const [kategori, setKategori] =
    useState('Semua')

  const kategoriList = useMemo(() => {
    const categories = images
      .map((i) => i.kategori)
      .filter((kategori): kategori is string => Boolean(kategori))

    return ['Semua', ...new Set(categories)]
  }, [images])

  const filteredImages =
    kategori === 'Semua'
      ? images
      : images.filter(
          (i) => i.kategori === kategori
        )

  const next = () => {

    if (selectedIndex === null) return

    setSelectedIndex(
      (selectedIndex + 1) %
        filteredImages.length
    )

  }

  const prev = () => {

    if (selectedIndex === null) return

    setSelectedIndex(
      (selectedIndex - 1 + filteredImages.length) %
        filteredImages.length
    )

  }

  return (
    <>
      {/* Filter Kategori */}
      <div className="mb-10 flex flex-wrap gap-3">

        {kategoriList.map((item) => (

          <button
            key={item}
            onClick={() => {
              setKategori(item)
              setSelectedIndex(null)
            }}
            className={
              `
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                kategori === item
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }
            `
            }
          >
            {item}
          </button>

        ))}

      </div>

      {/* Masonry Grid */}
      <div
        className="
          columns-1
          sm:columns-2
          lg:columns-3
          xl:columns-4
          gap-5
        "
      >

        {filteredImages.map((image, index) => (

          <div
            key={image.id}
            className="mb-5 break-inside-avoid"
          >

            <GalleryCard
              image={image}
              onClick={() => setSelectedIndex(index)}
            />

          </div>

        ))}

      </div>

      {selectedIndex !== null && (

        <GalleryModal
          images={filteredImages}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={next}
          onPrev={prev}
          onSelect={setSelectedIndex}
        />

      )}

    </>
  )

}