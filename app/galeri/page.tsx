import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { createClient } from '@/lib/supabase/server'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export default async function GaleriPage() {
  const supabase = await createClient()

  const { data: images } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-slate-500
              hover:text-emerald-600
              transition
            "
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>

          <div className="mt-8">

            <p className="font-medium text-emerald-600">
              Dokumentasi Desa
            </p>

            <h1
              className="
                mt-2
                text-4xl
                font-bold
                text-slate-900
                md:text-6xl
              "
            >
              Galeri Desa
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                leading-8
                text-slate-500
              "
            >
              Kumpulan dokumentasi kegiatan masyarakat,
              pembangunan desa, wisata, budaya,
              dan berbagai momen penting lainnya.
            </p>

          </div>

        </div>

      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 py-14">

        <GalleryGrid images={images ?? []} />

      </section>

    </main>
  )
}