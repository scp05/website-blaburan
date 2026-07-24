import { createClient } from '@/lib/supabase/server'
import { MapPin, Phone, Mail } from 'lucide-react'

export default async function Kontak() {
  const supabase = await createClient()

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('*')
    .limit(1)
    .single()

  return (
    <section
      id="kontak"
      className="bg-white py-16 md:py-24 px-5 md:px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-emerald-600 font-medium text-sm md:text-base mb-2">
            Hubungi Kami
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Kontak Desa
          </h2>

          <p className="text-slate-500 text-sm md:text-base leading-7 max-w-2xl mx-auto">
            Apabila membutuhkan informasi lebih lanjut mengenai pelayanan,
            kegiatan, maupun potensi dusun, silakan hubungi kami melalui kontak
            berikut.
          </p>
        </div>

        {/* Card Kontak */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Alamat */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <MapPin
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                Alamat
              </h3>
            </div>

            <p className="text-slate-500 leading-7">
              {profil?.alamat ?? '-'}
            </p>
          </div>

          {/* Telepon */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Phone
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                Telepon
              </h3>
            </div>

            <p className="text-slate-500 leading-7">
              {profil?.telepon ?? '-'}
            </p>
          </div>

          {/* Email */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Mail
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                Email
              </h3>
            </div>

            <p className="text-slate-500 leading-7 break-all">
              {profil?.email ?? '-'}
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}