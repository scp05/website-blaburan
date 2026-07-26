'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import UploadFoto from '@/components/admin/UploadFoto'
import { Trash2, X } from 'lucide-react'

type Umkm = {
  id: string
  nama_usaha: string
  kategori: string
  deskripsi: string
  pemilik: string
  kontak: string | null
  foto_url: string | null
}

export default function AdminUmkmPage() {
  const supabase = createClient()

  const [list, setList] = useState<Umkm[]>([])

  const [namaUsaha, setNamaUsaha] = useState('')
  const [kategori, setKategori] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [pemilik, setPemilik] = useState('')
  const [kontak, setKontak] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')

  const [loading, setLoading] = useState(false)

  const [preview, setPreview] =
    useState<string | null>(null)

  const fetchData = async () => {
    const { data } = await supabase
      .from('umkm')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    setList(data ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)

    await supabase.from('umkm').insert({
      nama_usaha: namaUsaha,
      kategori,
      deskripsi,
      pemilik,
      kontak,
      foto_url: fotoUrl,
    })

    setNamaUsaha('')
    setKategori('')
    setDeskripsi('')
    setPemilik('')
    setKontak('')
    setFotoUrl('')

    setLoading(false)

    fetchData()
  }

  const handleDelete = async (
    id: string
  ) => {
    if (
      !confirm(
        'Yakin ingin menghapus UMKM ini?'
      )
    )
      return

    await supabase
      .from('umkm')
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
            Ekonomi Dusun
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Kelola UMKM
          </h1>

          <p className="mt-3 text-black">
            Tambahkan dan kelola data UMKM
            yang akan ditampilkan pada
            website.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            mb-8
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            md:p-8
            space-y-6
          "
        >

          <h2 className="text-lg font-semibold text-black">
            Tambah UMKM Baru
          </h2>
          <Input
  label="Nama Usaha"
  value={namaUsaha}
  setValue={setNamaUsaha}
  required
/>

<Input
  label="Kategori"
  value={kategori}
  setValue={setKategori}
  required
/>

<Textarea
  label="Deskripsi"
  value={deskripsi}
  setValue={setDeskripsi}
  rows={5}
/>

<Input
  label="Nama Pemilik"
  value={pemilik}
  setValue={setPemilik}
  required
/>

<Input
  label="Kontak"
  value={kontak}
  setValue={setKontak}
/>

<div>

  <label className="block mb-2 text-sm font-medium text-black">
    Foto UMKM
  </label>

  <UploadFoto
    onUploaded={(url) => setFotoUrl(url)}
  />

  {fotoUrl && (
    <img
      src={fotoUrl}
      alt="Preview"
      className="
        mt-4
        w-32
        h-32
        rounded-2xl
        object-cover
        border-2
        border-slate-300
      "
    />
  )}

</div>

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
  {loading
    ? 'Menyimpan...'
    : 'Tambah UMKM'}
</button>

</form>

{/* List */}
<div>

  <h2 className="mb-5 text-lg font-semibold text-black">
    Daftar UMKM
  </h2>

  <div className="space-y-4">{list.map((u) => (

  <div
    key={u.id}
    className="
      flex
      items-center
      justify-between
      gap-5

      rounded-2xl
      border
      border-slate-200
      bg-white

      p-5

      shadow-sm
      transition
      hover:shadow-md
    "
  >

    <div className="flex items-center gap-4">

      {u.foto_url && (
        <img
          src={u.foto_url}
          alt={u.nama_usaha}
          onClick={() => setPreview(u.foto_url!)}
          className="
            h-20
            w-20
            cursor-pointer
            rounded-2xl
            object-cover
            border-2
            border-slate-200
            transition
            hover:scale-105
          "
        />
      )}

      <div>

        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {u.kategori}
        </span>

        <h3 className="mt-2 text-lg font-semibold text-black">
          {u.nama_usaha}
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 line-clamp-2">
          {u.deskripsi}
        </p>

        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium text-black">
            Pemilik:
          </span>{' '}
          {u.pemilik}
        </p>

        {u.kontak && (
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-medium text-black">
              Kontak:
            </span>{' '}
            {u.kontak}
          </p>
        )}

      </div>

    </div>

    <button
      onClick={() => handleDelete(u.id)}
      className="
        flex
        items-center
        gap-2

        rounded-full

        px-4
        py-2

        text-sm
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
                  rounded-2xl
                  object-contain
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

function Textarea({
  label,
  value,
  setValue,
  rows,
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
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
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
