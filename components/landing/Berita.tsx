import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BeritaCard from '../ui/BeritaCard'
import { ArrowRight } from 'lucide-react'

export default async function Berita() {
  const supabase = await createClient()

  const { data: berita } = await supabase
    .from('berita')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (!berita || berita.length === 0) return null

  return (
    <section
      id="berita"
      className="bg-white py-16 md:py-24 px-5 md:px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">

          <div>
            <p className="text-emerald-600 font-medium text-sm md:text-base mb-2">
              Informasi Terkini
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Berita Dusun
            </h2>

            <p className="text-slate-500 max-w-2xl leading-7">
              Berbagai informasi terbaru mengenai kegiatan, pembangunan,
              pelayanan, dan aktivitas masyarakat Dusun Blaburan.
            </p>
          </div>

          <Link
            href="/berita"
             className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-emerald-600
              px-5
              py-3
              text-sm
              font-semibold
              text-emerald-600
              transition
              hover:bg-emerald-600
              hover:text-white
            "
          >
            Lihat Semua
                        <ArrowRight size={18} />
                      </Link>

        </div>

        {/* Card Berita */}
        <div
          className="
            no-scrollbar
            flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2
            md:grid md:grid-cols-2 xl:grid-cols-4
            md:gap-6 md:overflow-visible
          "
        >
          {berita.map((item) => (
            <div
              key={item.id}
              className="
                min-w-75
                sm:min-w-85
                md:min-w-0
                snap-start
              "
            >
              <BeritaCard berita={item} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}