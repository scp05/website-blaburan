'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import UploadFoto from '@/components/admin/UploadFoto'
import { Trash2, X } from 'lucide-react'

type Perangkat = {
  id: string
  nama: string
  jabatan: string
  urutan: number
  foto_url: string | null
}

export default function AdminPerangkatPage() {
  const supabase = createClient()

  const [list, setList] = useState<Perangkat[]>([])
  const [nama, setNama] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [urutan, setUrutan] = useState(0)
  const [fotoUrl, setFotoUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const fetchData = async () => {
    const { data } = await supabase
      .from('perangkat_desa')
      .select('*')
      .order('urutan', { ascending: true })

    setList(data ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    await supabase
      .from('perangkat_desa')
      .insert({
        nama,
        jabatan,
        urutan,
        foto_url: fotoUrl,
      })

    setNama('')
    setJabatan('')
    setUrutan(0)
    setFotoUrl('')

    setLoading(false)

    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus perangkat ini?')) return

    await supabase
      .from('perangkat_desa')
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
            Struktur Organisasi
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Kelola Perangkat Dusun
          </h1>

          <p className="mt-3 text-black">
            Tambahkan dan kelola informasi perangkat dusun yang akan ditampilkan pada website.
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
            Tambah Perangkat Baru
          </h2>

          <Input
            label="Nama Lengkap"
            value={nama}
            setValue={setNama}
            required
          />

          <Input
            label="Jabatan"
            value={jabatan}
            setValue={setJabatan}
            required
          />

          <div>

            <label className="block mb-2 text-sm font-medium text-black">
              Urutan Tampilan
            </label>

            <input
              type="number"
              value={urutan}
              onChange={(e) => setUrutan(Number(e.target.value))}
              placeholder="Contoh: 1"
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

          <div>

            <label className="block mb-2 text-sm font-medium text-black">
              Foto Perangkat
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
                  rounded-full
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
            {loading ? 'Menyimpan...' : 'Tambah Perangkat'}
          </button>

        </form>
                {/* List */}
        <div>

          <h2 className="mb-5 text-lg font-semibold text-black">
            Daftar Perangkat
          </h2>

          <div className="space-y-4">

            {list.map((p) => (

              <div
                key={p.id}
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

                  {p.foto_url && (
                    <img
                      src={p.foto_url}
                      alt={p.nama}
                      onClick={() => setPreview(p.foto_url!)}
                      className="
                        h-16
                        w-16
                        cursor-pointer
                        rounded-full
                        object-cover
                        border-2
                        border-slate-200
                        transition
                        hover:scale-105
                      "
                    />
                  )}

                  <div>

                    <h3 className="font-semibold text-black">
                      {p.nama}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {p.jabatan}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Urutan tampil: {p.urutan}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => handleDelete(p.id)}
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