'use client'

import { X, MapPin } from 'lucide-react'


export default function WisataModal({
  wisata,
  close
}: {
  wisata: any
  close: () => void
}) {


  return (

    <div
      className="
        fixed
        inset-0

        z-50

        flex
        items-center
        justify-center

        bg-black/50

        px-5
      "

      onClick={close}
    >


      <div
        className="
          relative

          w-full
          max-w-xl

          overflow-hidden

          rounded-3xl

          bg-white

          shadow-2xl
        "

        onClick={(e) => e.stopPropagation()}
      >


        {/* Close Button */}
        <button
          onClick={close}
          className="
            absolute
            right-4
            top-4

            z-10

            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-full

            bg-white/90

            text-slate-700

            shadow

            transition

            hover:bg-white
          "
        >

          <X size={20}/>

        </button>




        {/* Image */}

        {wisata.foto_url && (

          <img
            src={wisata.foto_url}
            alt={wisata.nama_tempat}

            className="
              h-72
              w-full

              object-cover
            "
          />

        )}




        {/* Content */}

        <div className="p-7">


          <h2
            className="
              text-2xl

              font-bold

              text-slate-900
            "
          >
            {wisata.nama_tempat}
          </h2>



          <div
            className="
              mt-4

              flex
              items-center
              gap-2

              text-sm

              text-emerald-700
            "
          >

            <MapPin size={16}/>

            {wisata.lokasi}

          </div>




          <p
            className="
              mt-5

              text-slate-600

              leading-7
            "
          >
            {wisata.deskripsi}
          </p>




          <button
            onClick={close}

            className="
              mt-7

              w-full

              rounded-full

              bg-emerald-600

              py-3

              text-sm

              font-medium

              text-white

              transition

              hover:bg-emerald-700
            "
          >
            Tutup
          </button>


        </div>


      </div>


    </div>

  )
}