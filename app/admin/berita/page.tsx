'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import UploadFoto from '@/components/admin/UploadFoto'
import { Trash2 } from 'lucide-react'

type Berita = {
  id: string
  judul: string
  konten: string
  gambar_url: string | null
  penulis: string | null
}

export default function AdminBeritaPage() {
  const supabase = createClient()

  const [list, setList] = useState<Berita[]>([])

  const [judul, setJudul] = useState('')
  const [konten, setKonten] = useState('')
  const [penulis, setPenulis] = useState('')
  const [gambarUrl, setGambarUrl] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    setList(data ?? [])
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)

    const slug = judul
      .toLowerCase()
      .replace(/\s+/g, '-')

    await supabase
      .from('berita')
      .insert({
        judul,
        konten,
        penulis,
        slug,
        gambar_url: gambarUrl,
      })

    setJudul('')
    setKonten('')
    setPenulis('')
    setGambarUrl('')

    setLoading(false)

    fetchData()
  }

  const handleDelete = async (
    id: string
  ) => {
    if (
      !confirm('Yakin ingin menghapus berita ini?')
    )
      return

    await supabase
      .from('berita')
      .delete()
      .eq('id', id)

    fetchData()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <p className="text-black text-sm font-medium">
            Manajemen Informasi
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Kelola Berita
          </h1>

          <p className="mt-3 text-black max-w-xl">
            Tambahkan dan kelola informasi terbaru yang akan ditampilkan pada website Dusun.
          </p>

        </div>
        <form
  onSubmit={handleSubmit}
  className="
    rounded-3xl
    bg-white
    border
    border-slate-200
    shadow-sm
    p-6
    md:p-8
    space-y-8
  "
>

  {/* Informasi Berita */}

  <section>

    <h2 className="mb-5 text-lg font-semibold text-black">
      Informasi Berita
    </h2>

    <div className="space-y-5">

      <Input
        label="Judul Berita"
        value={judul}
        setValue={setJudul}
        required
      />

      <Textarea
        label="Isi Berita"
        value={konten}
        setValue={setKonten}
        rows={7}
        required
      />

      <Input
        label="Penulis"
        value={penulis}
        setValue={setPenulis}
      />

      <div>

        <label
          className="
            block
            mb-2
            text-sm
            font-medium
            text-black
          "
        >
          Gambar Berita
        </label>

        <UploadFoto
          onUploaded={(url) => setGambarUrl(url)}
        />

        {gambarUrl && (

          <img
            src={gambarUrl}
            alt="Preview"
            className="
              mt-4
              w-56
              aspect-video
              rounded-2xl
              border-2
              border-slate-300
              object-cover
            "
          />

        )}

      </div>

    </div>

  </section>

  {/* Tombol */}

  <div
    className="
      pt-6
      border-t
      border-slate-200
    "
  >

    <button
      disabled={loading}
      className="
        rounded-full
        bg-emerald-600
        px-7
        py-3
        text-sm
        font-medium
        text-white
        transition
        hover:bg-emerald-700
        disabled:opacity-50
      "
    >
      {loading ? 'Menyimpan...' : 'Tambah Berita'}
    </button>

  </div>

</form>
{/* Daftar Berita */}

<div>

  <h2 className="mb-5 text-lg font-semibold text-black">
    Daftar Berita
  </h2>

  <div className="space-y-4">

    {list.map((b) => (

      <div
        key={b.id}
        className="
          flex
          flex-col
          sm:flex-row
          gap-5
          sm:items-start
          justify-between

          rounded-3xl

          border
          border-slate-200

          bg-white

          p-5

          shadow-sm

          transition

          hover:shadow-md
        "
      >

        <div className="flex gap-5 flex-1">

          {b.gambar_url && (

            <img
              src={b.gambar_url}
              alt={b.judul}
              className="
                w-28
                aspect-video
                rounded-2xl
                object-cover
                border
                border-slate-200
                shrink-0
              "
            />

          )}

          <div className="flex-1">

            <h3 className="font-semibold text-black">
              {b.judul}
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-600
                line-clamp-2
              "
            >
              {b.konten}
            </p>

            {b.penulis && (

              <p
                className="
                  mt-3
                  text-xs
                  text-slate-500
                "
              >
                Oleh {b.penulis}
              </p>

            )}

          </div>

        </div>

        <button
          onClick={() => handleDelete(b.id)}
          className="
            flex
            items-center
            justify-center
            gap-2

            self-end
            sm:self-center

            rounded-full

            border
            border-red-200

            px-4
            py-2

            text-sm
            font-medium

            text-red-500

            transition

            hover:bg-red-50
          "
        >
          <Trash2 size={15} />
          Hapus
        </button>

      </div>

    ))}

  </div>

</div>

</div>
</div>
)
}
function Input({
  label,
  value,
  setValue,
  required = false,
}: any) {
  return (
    <div>
      <label
        className="
          block
          mb-2
          text-sm
          font-medium
          text-black
        "
      >
        {label}
      </label>

      <input
        value={value}
        required={required}
        placeholder={label}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full
          rounded-xl
          border-2
          border-slate-300
          bg-white
          px-4
          py-3
          text-sm
          text-black
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  setValue,
  rows,
  required = false,
}: any) {
  return (
    <div>
      <label
        className="
          block
          mb-2
          text-sm
          font-medium
          text-black
        "
      >
        {label}
      </label>

      <textarea
        value={value}
        rows={rows}
        required={required}
        placeholder={label}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full
          resize-none
          rounded-xl
          border-2
          border-slate-300
          bg-white
          px-4
          py-3
          text-sm
          text-black
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>
  )
}