'use client'

import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import GalleryModal from '@/components/gallery/GalleryModal'

import 'swiper/css'
import 'swiper/css/pagination'

interface GalleryItem {
  id: string
  gambar_url: string
  judul?: string | null
  kategori?: string | null
}

interface CarouselProps {
  images: GalleryItem[]
}

export default function Carousel({
  images,
}: CarouselProps) {

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null)

  const nextImage = () => {

    if (selectedIndex === null) return

    setSelectedIndex(
      (selectedIndex + 1) % images.length
    )

  }

  const prevImage = () => {

    if (selectedIndex === null) return

    setSelectedIndex(
      (selectedIndex - 1 + images.length) %
        images.length
    )

  }

  return (
    <>

      <Swiper
        modules={[
          Autoplay,
          Pagination,
        ]}
        loop
        grabCursor
        spaceBetween={18}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="gallery-swiper"
      >
                {images.map((image, index) => (

          <SwiperSlide key={image.id}>

            <div
              onClick={() => setSelectedIndex(index)}
              className="
                group
                cursor-pointer
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                relative
              "
            >

              <img
                src={image.gambar_url}
                alt={image.judul ?? ''}
                loading="lazy"
                className="
                  w-full
                  aspect-[4/5]
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                  p-5
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              >

                {image.kategori && (

                  <span
                    className="
                      inline-block
                      rounded-full
                      bg-emerald-500/90
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
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    {image.judul}
                  </h3>

                )}

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>
            {selectedIndex !== null && (
        <GalleryModal
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={nextImage}
          onPrev={prevImage}
          onSelect={setSelectedIndex}
        />
      )}

    </>
  )
}