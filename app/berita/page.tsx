import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CalendarDays, User } from 'lucide-react'

export default async function SemuaBerita() {
  const supabase = await createClient()

  const { data: berita } = await supabase
    .from('berita')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (!berita) return null

  return (
    <main className="bg-white min-h-screen py-16 md:py-24 px-5 md:px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-14">

          <p className="text-emerald-600 font-medium mb-2">
            Informasi Desa
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Semua Berita
          </h1>

          <p className="text-slate-500 max-w-2xl leading-7">
            Seluruh informasi terbaru mengenai kegiatan, pembangunan,
            pelayanan, dan berbagai aktivitas di desa.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {berita.map((item) => (
            <Link
              key={item.id}
              href={`/berita/${item.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition"
            >

              <div className="h-56 overflow-hidden bg-slate-100">

                <img
                  src={item.gambar_url || "/placeholder.jpg"}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-6">

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {new Date(item.created_at).toLocaleDateString('id-ID',{
                      day:'numeric',
                      month:'long',
                      year:'numeric'
                    })}
                  </div>

                  {item.penulis && (
                    <div className="flex items-center gap-2">
                      <User size={16}/>
                      {item.penulis}
                    </div>
                  )}

                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                  {item.judul}
                </h2>

                <p className="text-slate-500 leading-7 line-clamp-3">
                  {item.konten}
                </p>

                <div className="mt-6 text-emerald-600 font-semibold">
                  Baca Selengkapnya →
                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </main>
  )
}