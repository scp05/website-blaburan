import { createClient } from '@/lib/supabase/server'
import WisataCard from '..//ui/WisataCard'

export default async function Wisata() {
  const supabase = await createClient()

  const { data: list } = await supabase
    .from('wisata')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  if (!list || list.length === 0) return null


  return (
    <section
      id="wisata"
      className="bg-slate-50 py-16 md:py-24 px-5 md:px-6"
    >
      <div className="max-w-7xl mx-auto">


        {/* Heading */}
        <div className="mb-10 md:mb-14">

          <p className="text-emerald-600 font-medium text-sm md:text-base mb-2">
            Jelajahi Potensi Desa
          </p>


          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Wisata Desa
          </h2>


          <p className="text-slate-500 max-w-2xl leading-7">
            Nikmati berbagai destinasi menarik yang memiliki keindahan alam,
            budaya, dan potensi lokal Dusun Blaburan.
          </p>

        </div>



        {/* Cards */}
        <div
          className="
            grid
            sm:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {list.map((w) => (
            <WisataCard
              key={w.id}
              wisata={w}
            />
          ))}

        </div>


      </div>
    </section>
  )
}