'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UploadCloud } from 'lucide-react'

export default function UploadFoto({
  onUploaded,
}: {
  onUploaded: (url: string) => void
}) {
  const supabase = createClient()

  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setUploading(true)

    const fileNameUpload = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('uploads')
      .upload(fileNameUpload, file)

    if (!error) {
      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileNameUpload)

      onUploaded(data.publicUrl)
    }

    setUploading(false)
  }

  return (
    <div className="space-y-3">

      <label
        className="
          flex
          items-center
          justify-center
          gap-3

          w-full

          rounded-xl
          border-2
          border-dashed
          border-slate-300

          bg-slate-50

          px-4
          py-6

          cursor-pointer

          hover:border-emerald-500
          hover:bg-emerald-50

          transition
        "
      >
        <UploadCloud
          size={22}
          className="text-emerald-600"
        />

        <div className="text-center">

          <p className="font-medium text-slate-800">
            Pilih Foto
          </p>

          <p className="text-xs text-slate-500">
            JPG, PNG atau WEBP
          </p>

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

      </label>

      {fileName && (
        <p className="text-sm text-slate-600">
          📁 {fileName}
        </p>
      )}

      {uploading && (
        <p className="text-sm text-emerald-600">
          Mengunggah...
        </p>
      )}

    </div>
  )
}