'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CalendarDays, MapPin, Trash2 } from 'lucide-react'

type Agenda = {
  id: string
  nama_kegiatan: string
  deskripsi: string
  lokasi: string
  tanggal_mulai: string
}

export default function AdminAgendaPage() {
  const supabase = createClient()

  const [list, setList] = useState<Agenda[]>([])
  const [namaKegiatan, setNamaKegiatan] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [tanggalMulai, setTanggalMulai] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const { data } = await supabase
      .from('agenda')
      .select('*')
      .order('tanggal_mulai', { ascending: true })

    setList(data ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await supabase.from('agenda').insert({
      nama_kegiatan: namaKegiatan,
      deskripsi,
      lokasi,
      tanggal_mulai: tanggalMulai,
    })

    setNamaKegiatan('')
    setDeskripsi('')
    setLokasi('')
    setTanggalMulai('')
    setLoading(false)

    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus agenda ini?')) return

    await supabase
      .from('agenda')
      .delete()
      .eq('id', id)

    fetchData()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <p className="text-emerald-600 text-sm font-medium">
            Manajemen Informasi
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            Kelola Agenda
          </h1>

          <p className="mt-3 text-slate-500">
            Tambahkan dan kelola agenda kegiatan Dusun.
          </p>
        </div>

        <form className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
          ...
        </form>

      </div>
    </div>
  )
}