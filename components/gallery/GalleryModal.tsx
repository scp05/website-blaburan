'use client'

import { useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import {
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface GalleryItem {
  id: string
  gambar_url: string
  judul?: string | null
  kategori?: string | null
}

interface GalleryModalProps {
  images: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
}

export default function GalleryModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onSelect,
}: GalleryModalProps) {

  const selected = images[currentIndex]

  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    trackMouse: true,
  })

  useEffect(() => {

    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {

      if (e.key === 'Escape') onClose()

      if (e.key === 'ArrowRight') onNext()

      if (e.key === 'ArrowLeft') onPrev()

    }

    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }

  }, [currentIndex])

  return (

    <div
      {...handlers}
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[999]
        bg-black/95
        flex
        items-center
        justify-center
      "
    >

      <button
        onClick={onClose}
        className="
          absolute
          top-5
          right-5
          z-50
          rounded-full
          bg-white/10
          p-3
          text-white
          backdrop-blur
          hover:bg-white/20
          transition
        "
      >
        <X size={24}/>
      </button>

      <button
        onClick={(e)=>{
          e.stopPropagation()
          onPrev()
        }}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          z-50
          rounded-full
          bg-white/10
          p-3
          text-white
          backdrop-blur
          hover:bg-white/20
          transition
        "
      >
        <ChevronLeft size={28}/>
      </button>

      <button
        onClick={(e)=>{
          e.stopPropagation()
          onNext()
        }}
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          z-50
          rounded-full
          bg-white/10
          p-3
          text-white
          backdrop-blur
          hover:bg-white/20
          transition
        "
      >
        <ChevronRight size={28}/>
      </button>

      <div
        onClick={(e)=>e.stopPropagation()}
        className="
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          px-5
        "
      >

        <img
          src={selected.gambar_url}
          alt={selected.judul ?? ''}
          className="
            max-h-[75vh]
            max-w-full
            rounded-xl
            object-contain
          "
        />

        <div className="mt-6 text-center">

          {selected.kategori && (

            <span
              className="
                rounded-full
                bg-emerald-600
                px-4
                py-1
                text-sm
                text-white
              "
            >
              {selected.kategori}
            </span>

          )}

          {selected.judul && (

            <h2
              className="
                mt-4
                text-2xl
                font-bold
                text-white
              "
            >
              {selected.judul}
            </h2>

          )}

          <p className="mt-2 text-slate-400">

            {currentIndex + 1} / {images.length}

          </p>

        </div>

        {/* Thumbnail */}
        <div
          className="
            mt-8
            flex
            w-full
            gap-3
            overflow-x-auto
            pb-3
            justify-center
          "
        >
          {images.map((image, index) => (

            <button
              key={image.id}
              onClick={() => onSelect(index)}
              className={`
                shrink-0
                overflow-hidden
                rounded-xl
                border-2
                transition-all

                ${
                  currentIndex === index
                    ? 'border-emerald-500 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }
              `}
            >

              <img
                src={image.gambar_url}
                alt={image.judul ?? ''}
                className="
                  h-20
                  w-28
                  object-cover
                "
              />

            </button>

          ))}
        </div>

      </div>

    </div>

  )
}