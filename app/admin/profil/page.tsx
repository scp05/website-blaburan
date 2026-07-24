'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check } from 'lucide-react'

export default function AdminProfilDusunPage() {
  const supabase = createClient()

  const [id, setId] = useState<string | null>(null)

  const [namaDusun, setNamaDusun] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [visi, setVisi] = useState('')
  const [misi, setMisi] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telepon, setTelepon] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('profil_desa')
        .select('*')
        .limit(1)
        .single()

      if (data) {
        setId(data.id)
        setNamaDusun(data.nama_desa ?? '')
        setDeskripsi(data.deskripsi ?? '')
        setVisi(data.visi ?? '')
        setMisi(data.misi ?? '')
        setAlamat(data.alamat ?? '')
        setTelepon(data.telepon ?? '')
        setEmail(data.email ?? '')
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setSaved(false)

    const payload = {
      nama_desa: namaDusun,
      deskripsi,
      visi,
      misi,
      alamat,
      telepon,
      email,
    }

    if (id) {
      await supabase
        .from('profil_desa')
        .update(payload)
        .eq('id', id)
    } else {
      const { data } = await supabase
        .from('profil_desa')
        .insert(payload)
        .select()
        .single()

      if (data) setId(data.id)
    }

    setLoading(false)
    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-black text-sm font-medium">
            Pengaturan Website
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Profil Dusun
          </h1>

          <p className="mt-3 text-black max-w-xl">
            Kelola informasi utama yang akan ditampilkan pada halaman website Dusun.
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

          {/* Identitas */}
          <section>

            <h2 className="mb-5 text-lg font-semibold text-black">
              Identitas Dusun
            </h2>

            <div className="space-y-5">

              <Input
                label="Nama Dusun"
                value={namaDusun}
                setValue={setNamaDusun}
                required
              />

              <Textarea
                label="Deskripsi Dusun"
                value={deskripsi}
                setValue={setDeskripsi}
                rows={4}
              />

            </div>

          </section>
                    {/* Visi dan Misi */}
          <section>

            <h2 className="mb-5 text-lg font-semibold text-black">
              Visi dan Misi
            </h2>

            <div className="space-y-5">

              <Textarea
                label="Visi"
                value={visi}
                setValue={setVisi}
                rows={3}
              />

              <Textarea
                label="Misi"
                value={misi}
                setValue={setMisi}
                rows={5}
              />

            </div>

          </section>

          {/* Informasi Kontak */}
          <section>

            <h2 className="mb-5 text-lg font-semibold text-black">
              Informasi Kontak
            </h2>

            <div className="space-y-5">

              <Input
                label="Alamat"
                value={alamat}
                setValue={setAlamat}
              />

              <Input
                label="Nomor Telepon"
                value={telepon}
                setValue={setTelepon}
              />

              <Input
                label="Email"
                value={email}
                setValue={setEmail}
              />

            </div>

          </section>

          {/* Button */}
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
              {loading ? 'Menyimpan...' : 'Simpan Profil'}
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