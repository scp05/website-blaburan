import { createClient } from '@/lib/supabase/server'

export default async function Statistik() {
  const supabase = await createClient()

  const { data: s } = await supabase
    .from('statistik')
    .select('*')
    .limit(1)
    .single()

  if (!s) return null

  const items = [
    {
      label: 'Penduduk',
      value: s.jumlah_penduduk.toLocaleString('id-ID'),
      small: false,
    },
    {
      label: 'Kepala Keluarga',
      value: s.jumlah_kk.toLocaleString('id-ID'),
      small: false,
    },
    {
      label: 'RT',
      value: s.jumlah_dusun,
      small: false,
    },
    {
      label: 'Luas Wilayah',
      value: `${s.luas_wilayah} m²`,
      small: true,
    },
  ]

  return (
    <section className="bg-slate-50 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Statistik
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Data Dusun
          </h2>

          <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto leading-7">
            Gambaran singkat mengenai kondisi dan potensi Dusun berdasarkan data terbaru.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {items.map((item) => (

            <div
              key={item.label}
              className="
                rounded-2xl
                md:rounded-3xl
                border
                border-slate-200
                bg-white
                px-5
                py-7
                md:p-8
                text-center
                shadow-sm
                hover:shadow-lg
                transition
              "
            >

              <h3
                className={`
                  font-bold
                  text-emerald-600
                  leading-none
                  break-words
                  ${
                    item.small
                      ? 'text-3xl md:text-4xl'
                      : 'text-4xl md:text-5xl'
                  }
                `}
              >
                {item.value}
              </h3>

              <div className="w-10 h-px bg-slate-300 mx-auto my-4"></div>

              <p className="text-xs md:text-sm uppercase tracking-wider text-slate-500">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  )
}