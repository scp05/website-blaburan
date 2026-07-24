import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CalendarDays, User } from 'lucide-react'

export default async function DetailBerita({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('berita')
    .select('*')
    .eq('slug', slug)
    .single()

  console.log(slug)
  console.log(data)
  console.log(error)

  if (!data) {
    notFound()
  }

  return (
    <main className="bg-white py-16 md:py-24">
      <article className="max-w-4xl mx-auto px-5">
        <img
          src={data.gambar_url || '/placeholder.jpg'}
          alt={data.judul}
          className="rounded-3xl w-full h-[260px] md:h-[450px] object-cover mb-10"
        />

        <div className="flex flex-wrap gap-6 text-slate-500 mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {new Date(data.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>

          {data.penulis && (
            <div className="flex items-center gap-2">
              <User size={18} />
              {data.penulis}
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          {data.judul}
        </h1>

        <div className="leading-9 whitespace-pre-line text-slate-600 text-lg">
          {data.konten}
        </div>
      </article>
    </main>
  )
}