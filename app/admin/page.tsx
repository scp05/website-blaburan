import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  Newspaper,
  Images,
  Store,
  MapPinned,
  Users,
  ArrowUpRight,
} from 'lucide-react'

type Aktivitas = {
  id: string
  judul: string
  tanggal: string
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: jumlahBerita },
    { count: jumlahUmkm },
    { count: jumlahWisata },
    { count: jumlahGaleri },
    { count: jumlahPerangkat },
    { data: berita },
  ] = await Promise.all([
    supabase.from('berita').select('*', { count: 'exact', head: true }),
    supabase.from('umkm').select('*', { count: 'exact', head: true }),
    supabase.from('wisata').select('*', { count: 'exact', head: true }),
    supabase.from('galeri').select('*', { count: 'exact', head: true }),
    supabase.from('perangkat_desa').select('*', { count: 'exact', head: true }),
    supabase
      .from('berita')
      .select('id, judul, created_at')
      .order('created_at', { ascending: false })
      .limit(6),
  ])

  const aktivitas: Aktivitas[] =
    (berita ?? []).map((item) => ({
      id: item.id,
      judul: item.judul,
      tanggal: item.created_at,
    }))

  const statistik = [
    {
      title: 'Berita',
      value: jumlahBerita ?? 0,
      icon: Newspaper,
      href: '/admin/berita',
    },
    {
      title: 'UMKM',
      value: jumlahUmkm ?? 0,
      icon: Store,
      href: '/admin/umkm',
    },
    {
      title: 'Wisata',
      value: jumlahWisata ?? 0,
      icon: MapPinned,
      href: '/admin/wisata',
    },
    {
      title: 'Galeri',
      value: jumlahGaleri ?? 0,
      icon: Images,
      href: '/admin/galeri',
    },
    {
      title: 'Perangkat Dusun',
      value: jumlahPerangkat ?? 0,
      icon: Users,
      href: '/admin/perangkat',
    },
  ]

  const quickActions = [
    {
      label: 'Tambah Berita',
      href: '/admin/berita',
    },
    {
      label: 'Tambah UMKM',
      href: '/admin/umkm',
    },
    {
      label: 'Tambah Wisata',
      href: '/admin/wisata',
    },
    {
      label: 'Tambah Foto Galeri',
      href: '/admin/galeri',
    },
  ]

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="p-5 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-sm text-slate-400">
              {today}
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">
              Selamat Datang, Admin
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Kelola seluruh informasi website dusun dari satu tempat.
            </p>
          </div>

        </div>

        {/* Statistik */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

          {statistik.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.title}
                href={item.href}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon
                      size={20}
                      className="text-emerald-600"
                    />
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 transition group-hover:text-emerald-600"
                  />

                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {item.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.title}
                </p>

              </Link>
            )
          })}

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Aktivitas */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="mb-6 text-lg font-semibold text-slate-900">
              Berita Terbaru
            </h2>

            {aktivitas.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">
                Belum ada berita.
              </p>
            ) : (
              <div className="space-y-3">

                {aktivitas.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl p-3 hover:bg-slate-50"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                      <Newspaper
                        size={18}
                        className="text-emerald-600"
                      />
                    </div>

                    <div className="flex-1">

                      <p className="font-medium text-slate-900">
                        {item.judul}
                      </p>

                      <p className="text-xs text-slate-400">
                        {new Date(item.tanggal).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </p>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-slate-900">
              Aksi Cepat
            </h2>

            <div className="space-y-3">

              {quickActions.map((item) => (

                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-slate-200
                    p-3
                    text-sm
                    font-medium
                    text-slate-700
                    transition
                    hover:border-emerald-200
                    hover:bg-emerald-50
                    hover:text-emerald-700
                  "
                >
                  {item.label}

                  <ArrowUpRight size={16} />

                </Link>

              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}