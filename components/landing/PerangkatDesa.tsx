import { createClient } from '@/lib/supabase/server'

export default async function PerangkatDusun() {
  const supabase = await createClient()

  const { data: list } = await supabase
    .from('perangkat_desa')
    .select('*')
    .order('urutan', { ascending: true })

  if (!list || list.length === 0) return null

  return (
    <section
      id="perangkat"
      className="bg-slate-50 py-16 md:py-24 px-5 md:px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <p className="text-emerald-600 font-medium text-sm md:text-base mb-2">
            Struktur Organisasi
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Perangkat Dusun
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto leading-7">
            Aparatur yang bertugas memberikan pelayanan, menjalankan administrasi,
            dan mendukung pembangunan serta kegiatan masyarakat Dusun.
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
          "
        >

          {list.map((p) => (

            <div
              key={p.id}
              className="
                group
                rounded-3xl
                bg-white
                border
                border-slate-200
                p-6
                text-center
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="relative w-fit mx-auto mb-5">

                <div
                  className="
                    absolute
                    -inset-2
                    rounded-full
                    bg-emerald-100
                    scale-95
                    group-hover:scale-100
                    transition
                  "
                />

                <div
                  className="
                    relative
                    w-28
                    h-28
                    rounded-full
                    overflow-hidden
                    border-4
                    border-white
                    shadow
                    bg-slate-100
                  "
                >

                  {p.foto_url ? (
                    <img
                      src={p.foto_url}
                      alt={p.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}

                </div>

              </div>


              <h3 className="text-lg font-semibold text-slate-900">
                {p.nama}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {p.jabatan}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  )
}