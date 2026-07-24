'use client'

interface GalleryCardProps {
  image: {
    id: string
    gambar_url: string
    judul?: string | null
    kategori?: string | null
  }
  onClick: () => void
}

export default function GalleryCard({
  image,
  onClick,
}: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        mb-4
        w-full
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <img
        src={image.gambar_url}
        alt={image.judul ?? ''}
        loading="lazy"
        className="
          w-full
          h-auto
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
          opacity-0
          transition
          duration-300
          group-hover:opacity-100
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-4
          translate-y-4
          opacity-0
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        {image.kategori && (
          <span
            className="
              inline-block
              rounded-full
              bg-emerald-500
              px-3
              py-1
              text-xs
              font-medium
              text-white
            "
          >
            {image.kategori}
          </span>
        )}

        {image.judul && (
          <h3
            className="
              mt-3
              text-left
              text-lg
              font-semibold
              text-white
            "
          >
            {image.judul}
          </h3>
        )}
      </div>
    </button>
  )
}