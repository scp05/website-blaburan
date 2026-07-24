'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import UploadFoto from '@/components/admin/UploadFoto'
import { Trash2, X } from 'lucide-react'

type Galeri = {
  id: string
  judul: string | null
  gambar_url: string
  kategori: string | null
}

export default function AdminGaleriPage() {
  const supabase = createClient()

  const [list, setList] = useState<Galeri[]>([])
  const [judul, setJudul] = useState('')
  const [gambarUrl, setGambarUrl] = useState('')
  const [kategori, setKategori] = useState('')
  const [loading, setLoading] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const fetchData = async () => {
    const { data } = await supabase
      .from('galeri')
      .select('*')
      .order('created_at', { ascending: false })

    setList(data ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!gambarUrl) {
      alert('Upload foto terlebih dahulu.')
      return
    }

    setLoading(true)

    await supabase.from('galeri').insert({
      judul,
      gambar_url: gambarUrl,
      kategori,
    })

    setJudul('')
    setKategori('')
    setGambarUrl('')
    setLoading(false)

    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return

    await supabase
      .from('galeri')
      .delete()
      .eq('id', id)

    fetchData()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-black text-sm font-medium">
            Manajemen Media
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Kelola Galeri
          </h1>

          <p className="mt-3 text-black">
            Tambahkan dan kelola dokumentasi kegiatan Dusun.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            mb-8
            rounded-3xl
            bg-white
            border
            border-slate-200
            shadow-sm
            p-6
            md:p-8
            space-y-6
          "
        >
          <h2 className="text-lg font-semibold text-black">
            Tambah Foto Baru
          </h2>

          <Input
            label="Judul Foto"
            value={judul}
            setValue={setJudul}
          />
                    <div>
            <label className="block mb-2 text-sm font-medium text-black">
              Foto
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
                  w-48
                  aspect-square
                  object-cover
                  rounded-2xl
                  border-2
                  border-slate-300
                "
              />
            )}
          </div>

          <Input
            label="Kategori"
            value={kategori}
            setValue={setKategori}
          />

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
            {loading ? 'Menyimpan...' : 'Tambah Foto'}
          </button>

        </form>

        {/* Gallery */}
        <div>

          <h2 className="mb-5 text-lg font-semibold text-black">
            Daftar Galeri
          </h2>

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-5
            "
          >
            {list.map((g) => (

              <div
                key={g.id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                <img
                  src={g.gambar_url}
                  alt={g.judul ?? ''}
                  onClick={() => setPreview(g.gambar_url)}
                  className="
                    w-full
                    aspect-square
                    object-cover
                    cursor-pointer
                    hover:opacity-90
                    transition
                  "
                />

                <div className="p-4">

                  <p className="text-sm font-semibold text-black truncate">
                    {g.judul || 'Tanpa Judul'}
                  </p>

                  {g.kategori && (
                    <p className="mt-1 text-xs text-slate-500">
                      {g.kategori}
                    </p>
                  )}

                  <button
                    onClick={() => handleDelete(g.id)}
                    className="
                      mt-4
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-2
                      text-sm
                      text-red-500
                      transition
                      hover:bg-red-50
                    "
                  >
                    <Trash2 size={14} />
                    Hapus
                  </button>

                </div>

              </div>

            ))}
          </div>
        </div>
              {/* Modal Preview */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-4
          "
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="
                absolute
                -top-4
                -right-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-lg
                transition
                hover:bg-slate-100
              "
            >
              <X size={20} />
            </button>

            <img
              src={preview}
              alt="Preview"
              className="
                max-h-[85vh]
                max-w-[90vw]
                object-contain
                rounded-2xl
                bg-white
              "
            />
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

function Input({
  label,
  value,
  setValue,
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
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
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