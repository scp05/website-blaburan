'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CalendarDays, Trash2 } from 'lucide-react'

type Pengumuman = {
  id: string
  judul: string
  isi: string
  tanggal: string
}

export default function AdminPengumumanPage() {
  const supabase = createClient()

  const [list, setList] = useState<Pengumuman[]>([])
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const { data } = await supabase
      .from('pengumuman')
      .select('*')
      .order('tanggal', { ascending: false })

    setList(data ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await supabase
      .from('pengumuman')
      .insert({
        judul,
        isi,
        tanggal
      })

    setJudul('')
    setIsi('')
    setTanggal('')
    setLoading(false)

    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pengumuman ini?')) return

    await supabase
      .from('pengumuman')
      .delete()
      .eq('id', id)

    fetchData()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-emerald-600 text-sm font-medium">
            Manajemen Informasi
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            Kelola Pengumuman
          </h1>

          <p className="mt-3 text-slate-500">
            Tambahkan informasi penting untuk masyarakat Dusun.
          </p>
        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            mb-8
            bg-white
            rounded-3xl
            border
            border-slate-200
            shadow-sm
            p-6
            md:p-8
            space-y-5
          "
        >

          <h2 className="text-lg font-semibold text-slate-900">
            Tambah Pengumuman Baru
          </h2>


          <Input
            label="Judul Pengumuman"
            value={judul}
            setValue={setJudul}
            required
          />


          <Textarea
            label="Isi Pengumuman"
            value={isi}
            setValue={setIsi}
            rows={5}
            required
          />


          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Tanggal
            </label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-100
              "
            />
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
            {loading ? 'Menyimpan...' : 'Tambah Pengumuman'}
          </button>

        </form>


        {/* List */}
        <div>

          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Daftar Pengumuman
          </h2>


          <div className="space-y-4">

            {list.map((p) => (

              <div
                key={p.id}
                className="
                  flex
                  items-start
                  justify-between
                  gap-5

                  bg-white

                  border
                  border-slate-200

                  rounded-2xl

                  p-5

                  transition

                  hover:shadow-md
                "
              >

                <div className="flex-1">

                  <h3 className="font-semibold text-slate-900">
                    {p.judul}
                  </h3>


                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                      line-clamp-3
                    "
                  >
                    {p.isi}
                  </p>


                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-slate-400
                    "
                  >
                    <CalendarDays size={14}/>

                    {p.tanggal}

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
                  <Trash2 size={15}/>
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
  required = false
}: any) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          text-sm
          outline-none
          transition
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
  required = false
}: any) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        rows={rows}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          text-sm
          outline-none
          transition
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>
  )
}