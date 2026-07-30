import { createClient } from '@/lib/supabase/server'
import { Sprout, MapPin } from 'lucide-react'

export default async function ProfilDusun() {
  const supabase = await createClient()

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('*')
    .limit(1)
    .single()

  if (!profil) return null

  return (
    <section
      id="profil"
      className="bg-white py-20 md:py-28 px-5 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-emerald-600">
            Tentang Kami
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
            Profil {profil.nama_desa}
          </h2>

          <p className="mt-6 max-w-3xl text-slate-600 leading-8 text-base">
            {profil.deskripsi}
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Foto */}
          <div className="relative">
            <div
              className="overflow-hidden border border-slate-200 shadow-sm"
              style={{
                borderRadius: '70px 18px 70px 18px',
              }}
            >
              <img
                src="/images/tugu.jpeg"
                alt={profil.nama_desa}
                className="w-full h-80 md:h-[500px] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-yellow-400/90 -z-10" />
          </div>

          {/* Potensi & Informasi */}
          <div className="space-y-6">
            {/* Potensi Unggulan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Potensi Unggulan
                </h3>
              </div>

              <p className="whitespace-pre-line text-slate-600 leading-8">
                {profil.visi}
              </p>
            </div>

            {/* Informasi Dusun */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sky-600" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Informasi Dusun
                </h3>
              </div>

              <p className="whitespace-pre-line text-slate-600 leading-8">
                {profil.misi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}