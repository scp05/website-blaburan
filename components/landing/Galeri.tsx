import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { createClient } from '@/lib/supabase/server'
import Carousel from '@/components/ui/Carousel'

export default async function Galeri() {
  const supabase = await createClient()

  const { data: list } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  if (!list?.length) return null

  return (
    <section
      id="galeri"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Dokumentasi
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">
              Galeri Dusun
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-500">
              Dokumentasi kegiatan masyarakat,
              pembangunan dusun, wisata,
              serta berbagai momen penting lainnya.
            </p>

          </div>

          <Link
            href="/galeri"
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

        <Carousel images={list} />

      </div>
    </section>
  )
}