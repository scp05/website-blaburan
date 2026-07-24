import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  Phone,
  Mail,
  MapPin,
  Globe,
} from 'lucide-react'

export default async function Footer() {
  const supabase = await createClient()

  const { data: profil } = await supabase
    .from('profil_desa')
    .select('*')
    .limit(1)
    .single()

  return (
    <footer className="bg-slate-900 pt-16 pb-8 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top Footer */}
        <div className="grid gap-10 border-b border-slate-700 pb-10 md:grid-cols-3">

          {/* Desa */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              {profil?.nama_desa ?? 'Desa Sukamaju'}
            </h3>

            <div className="flex items-start gap-3 leading-7 text-slate-400">
              <MapPin
                size={18}
                className="mt-1 shrink-0 text-emerald-500"
              />

              <p>
                {profil?.alamat ??
                  'Alamat dusun belum tersedia.'}
              </p>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Kontak
            </h3>

            <div className="space-y-4">

              {profil?.telepon && (
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone
                    size={18}
                    className="text-emerald-500"
                  />

                  <span>{profil.telepon}</span>
                </div>
              )}

              {profil?.email && (
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail
                    size={18}
                    className="text-emerald-500"
                  />

                  <span>{profil.email}</span>
                </div>
              )}

            </div>
          </div>

          {/* Tentang */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Tentang
            </h3>

            <div className="flex items-start gap-3 leading-7 text-slate-400">
              <Globe
                size={18}
                className="mt-1 shrink-0 text-emerald-500"
              />

              <p>
                Website resmi dusun yang menyediakan informasi
                profil dusun, UMKM, wisata, berita,
                galeri, dan layanan informasi
                bagi masyarakat.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <p className="text-center text-sm text-slate-500 md:text-left">
            © {new Date().getFullYear()} {profil?.nama_desa ?? 'Desa Sukamaju'}.
            Seluruh hak cipta dilindungi.
          </p>

          <div className="flex flex-col items-center gap-2 md:items-end">

            <p className="text-sm text-slate-600">
              KKN.AA.84.125 UPNVYK 2026
            </p>

            <Link
              href="/login"
              className="
                text-xs
                text-slate-500
                transition
                hover:text-emerald-500
                hover:underline
              "
            >
              Login Admin
            </Link>

          </div>

        </div>

      </div>
    </footer>
  )
}