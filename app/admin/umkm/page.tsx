'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import UploadFoto from '@/components/admin/UploadFoto'
import Modal from '@/components/ui/Modal'
import { Trash2, Check } from 'lucide-react'

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
  const [saved, setSaved] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)

  const fetchData = async () => {
    const { data } = await supabase
      .from('umkm')
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
      .from('umkm')
      .insert({
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
    setSaved(true)

    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus UMKM ini?')) return

    await supabase
      .from('umkm')
      .delete()
      .eq('id', id)

    fetchData()
  }

  return (
    <div>
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
          space-y-8
        "
        >
          <section>
            <h2 className="mb-5 text-lg font-semibold text-black">
              Informasi UMKM
            </h2>

            <div className="space-y-5">

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
                placeholder="Contoh: Kuliner"
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
                placeholder="08xxxxxxxxxx"
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
                      w-36
                      aspect-square
                      object-cover
                      rounded-2xl
                      border
                      border-slate-200
                    "
                  />
                )}
              </div>

            </div>
          </section>

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
              {loading ? 'Menyimpan...' : 'Tambah UMKM'}
            </button>
          </div>
        </form>
              {/* List */}
      <div>

        <h2 className="mb-5 text-lg font-semibold text-black">
          Daftar UMKM
        </h2>

        <div className="space-y-4">

          {list.map((u) => (

            <div
              key={u.id}
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

                {u.foto_url && (
                  <img
                    src={u.foto_url}
                    alt={u.nama_usaha}
                    className="
                      h-20
                      w-20
                      rounded-xl
                      object-cover
                      shrink-0
                    "
                  />
                )}

                <div className="flex-1">

                  <span className="text-sm font-medium text-emerald-600">
                    {u.kategori}
                  </span>

                  <h3 className="mt-1 text-lg font-semibold text-black">
                    {u.nama_usaha}
                  </h3>

                  <p className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-500
                    line-clamp-2
                  ">
                    {u.deskripsi}
                  </p>

                  <div className="mt-3 space-y-1">

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-black">
                        Pemilik:
                      </span>{' '}
                      {u.pemilik}
                    </p>

                    {u.kontak && (
                      <p className="text-sm text-slate-600">
                        <span className="font-medium text-black">
                          Kontak:
                        </span>{' '}
                        {u.kontak}
                      </p>
                    )}

                  </div>

                </div>

              </div>

              <button
                onClick={() => handleDelete(u.id)}
                className="
                  rounded-full
                  px-4
                  py-2

                  text-sm
                  text-red-500

                  transition

                  hover:bg-red-50
                "
              >
                Hapus
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
)
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
}}