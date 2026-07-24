'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import UploadFoto from '@/components/admin/UploadFoto'
import Modal from '@/components/ui/Modal'
import { Trash2, Check } from 'lucide-react'

type Wisata = {
  id: string
  nama_tempat: string
  deskripsi: string
  lokasi: string
  foto_url: string | null
}

export default function AdminWisataPage() {
  const supabase = createClient()

  const [list, setList] = useState<Wisata[]>([])

  const [namaTempat, setNamaTempat] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const fetchData = async () => {
    const { data } = await supabase
      .from('wisata')
      .select('*')
      .order('created_at', { ascending: false })

    setList(data ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setSaved(false)

    await supabase
      .from('wisata')
      .insert({
        nama_tempat: namaTempat,
        deskripsi,
        lokasi,
        foto_url: fotoUrl,
      })

    setNamaTempat('')
    setDeskripsi('')
    setLokasi('')
    setFotoUrl('')

    setLoading(false)
    setSaved(true)

    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus tempat wisata ini?')) return

    await supabase
      .from('wisata')
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
            Destinasi Wisata
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Kelola Wisata
          </h1>

          <p className="mt-3 text-black max-w-xl">
            Tambahkan dan kelola informasi tempat wisata yang akan ditampilkan pada website.
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
            Tambah Tempat Wisata
          </h2>

          <Input
            label="Nama Tempat Wisata"
            value={namaTempat}
            setValue={setNamaTempat}
            required
          />

          <Textarea
            label="Deskripsi"
            value={deskripsi}
            setValue={setDeskripsi}
            rows={5}
          />

          <Input
            label="Lokasi"
            value={lokasi}
            setValue={setLokasi}
            required
          />

          <div>

            <label className="block mb-2 text-sm font-medium text-black">
              Foto Tempat Wisata
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
                  aspect-square
                  object-cover
                  rounded-2xl
                  border
                  border-slate-200
                "
              />
            )}

          </div>

          <div
            className="
              flex
              items-center
              gap-4
              border-t
              border-slate-200
              pt-6
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
              {loading ? 'Menyimpan...' : 'Tambah Wisata'}
            </button>

            {saved && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-emerald-600
                "
              >
                <Check size={16} />
                Tersimpan
              </div>
            )}

          </div>

        </form>

        {/* List */}
        <div>

          <h2 className="mb-5 text-lg font-semibold text-black">
            Daftar Tempat Wisata
          </h2>

          <div className="space-y-4">

            {list.map((w) => (

              <div
                key={w.id}
                className="
                  flex
                  items-start
                  justify-between
                  gap-5

                  rounded-2xl
                  border
                  border-slate-200
                  bg-white

                  p-5

                  transition
                  hover:shadow-md
                "
              >

                <div className="flex gap-4 flex-1">

                  {w.foto_url && (

                    <img
                      src={w.foto_url}
                      alt={w.nama_tempat}
                      onClick={() => setPreview(w.foto_url)}
                      className="
                        w-20
                        h-20
                        rounded-xl
                        object-cover
                        cursor-pointer
                        shrink-0
                        hover:opacity-90
                      "
                    />

                  )}

                  <div className="flex-1">

                    <h3 className="text-lg font-semibold text-black">
                      {w.nama_tempat}
                    </h3>

                    <p className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                      line-clamp-2
                    ">
                      {w.deskripsi}
                    </p>

                    <p className="mt-3 text-sm text-slate-600">
                      <span className="font-medium text-black">
                        Lokasi:
                      </span>{' '}
                      {w.lokasi}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => handleDelete(w.id)}
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

        <Modal
          open={!!preview}
          onClose={() => setPreview(null)}
        >
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="
                max-h-[85vh]
                max-w-full
                w-auto
                h-auto
                object-contain
                mx-auto
              "
            />
          )}
        </Modal>

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