import { createClient } from '@/lib/supabase/server'
import UmkmCard from '../ui/UmkmCard'

export default async function Umkm() {

  const supabase = await createClient()

  const { data: list } = await supabase
    .from('umkm')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)


  if (!list || list.length === 0) return null


  return (

<section
  id="umkm"
  className="bg-white py-16 md:py-24 px-5 md:px-6"
>
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    {/* Heading */}
{/* Heading */}
<div className="mb-10 md:mb-14 text-center">

  <p className="text-emerald-600 font-medium text-sm md:text-base">
    Ekonomi Lokal Dusun
  </p>

  <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
    UMKM Unggulan
  </h2>

  <p className="mt-4 max-w-2xl mx-auto text-slate-500 leading-7">
    Berbagai produk unggulan hasil karya masyarakat dusun yang menjadi
    penggerak ekonomi lokal, mulai dari kuliner, kerajinan, hingga usaha
    kreatif lainnya.
  </p>

</div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {list.map((item) => (
        <UmkmCard
          key={item.id}
          umkm={item}
        />
      ))}
    </div>

  </div>
</section>)
}