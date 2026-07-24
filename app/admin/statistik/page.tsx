'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check } from 'lucide-react'

export default function AdminStatistikPage() {
  const supabase = createClient()

  const [id, setId] = useState<string | null>(null)

  const [jumlahPenduduk, setJumlahPenduduk] = useState(0)
  const [jumlahKK, setJumlahKK] = useState(0)
  const [jumlahDusun, setJumlahDusun] = useState(0)
  const [luasWilayah, setLuasWilayah] = useState('')

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('statistik')
        .select('*')
        .limit(1)
        .single()

      if (data) {
        setId(data.id)
        setJumlahPenduduk(data.jumlah_penduduk ?? 0)
        setJumlahKK(data.jumlah_kk ?? 0)
        setJumlahDusun(data.jumlah_dusun ?? 0)
        setLuasWilayah(data.luas_wilayah ?? '')
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setSaved(false)

    const payload = {
      jumlah_penduduk: jumlahPenduduk,
      jumlah_kk: jumlahKK,
      jumlah_dusun: jumlahDusun,
      luas_wilayah: luasWilayah,
    }

    if (id) {
      await supabase
        .from('statistik')
        .update(payload)
        .eq('id', id)
    } else {
      const { data } = await supabase
        .from('statistik')
        .insert(payload)
        .select()
        .single()

      if (data) {
        setId(data.id)
      }
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
            Data Desa
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-black">
            Statistik Desa
          </h1>

          <p className="mt-3 text-black max-w-xl">
            Kelola data statistik yang akan ditampilkan pada halaman utama website.
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

          <section>

            <h2 className="mb-5 text-lg font-semibold text-black">
              Informasi Statistik
            </h2>

            <div className="space-y-5">

              <NumberInput
                label="Jumlah Penduduk"
                value={jumlahPenduduk}
                setValue={setJumlahPenduduk}
              />

              <NumberInput
                label="Jumlah Kepala Keluarga"
                value={jumlahKK}
                setValue={setJumlahKK}
              />

              <NumberInput
                label="Jumlah Dusun"
                value={jumlahDusun}
                setValue={setJumlahDusun}
              />

              <Input
                label="Luas Wilayah"
                placeholder="Contoh: 124.5"
                value={luasWilayah}
                setValue={setLuasWilayah}
              />

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
              {loading ? 'Menyimpan...' : 'Simpan Statistik'}
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
  placeholder = '',
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
        placeholder={placeholder}
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

function NumberInput({
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
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
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