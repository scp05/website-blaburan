'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import WisataModal from './WisataModal'


export default function WisataCard({
  wisata
}: {
  wisata: any
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
          rounded-3xl

          bg-white
          border
          border-slate-200

          transition-all
          duration-300

          hover:-translate-y-1
          hover:shadow-xl
        "
      >

        {/* Image */}
        <div className="
          relative
          h-56
          overflow-hidden
          bg-slate-100
        ">

          {wisata.foto_url ? (

            <img
              src={wisata.foto_url}
              alt={wisata.nama_tempat}
              className="
                w-full
                h-full
                object-cover

                transition
                duration-500

                group-hover:scale-110
              "
            />

          ) : (

            <div
              className="
                flex
                items-center
                justify-center

                h-full

                text-sm
                text-slate-400
              "
            >
              Tidak ada gambar
            </div>

          )}

        </div>



        {/* Content */}
        <div className="p-6">


          <h3
            className="
              text-xl
              font-semibold
              text-slate-900

              transition

              group-hover:text-emerald-600
            "
          >
            {wisata.nama_tempat}
          </h3>



          <p
            className="
              mt-3

              text-sm
              leading-6

              text-slate-500

              line-clamp-2
            "
          >
            {wisata.deskripsi}
          </p>



          <div
            className="
              mt-5

              inline-flex
              items-center
              gap-2

              rounded-full

              bg-emerald-50

              px-4
              py-2

              text-xs
              font-medium

              text-emerald-700
            "
          >

            <MapPin size={14} />

            {wisata.lokasi}

          </div>


        </div>


      </article>



      {open && (

        <WisataModal
          wisata={wisata}
          close={() => setOpen(false)}
        />

      )}


    </>
  )
}