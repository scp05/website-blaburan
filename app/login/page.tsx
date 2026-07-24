'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email atau password salah')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-lime-100 via-emerald-50 to-yellow-100">

      {/* Background Blur */}
      <div className="absolute -top-36 -left-36 h-[500px] w-[500px] rounded-full bg-emerald-400/30 blur-[130px]" />

      <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-yellow-300/35 blur-[140px]" />

      <div className="absolute -bottom-36 left-1/3 h-[420px] w-[420px] rounded-full bg-lime-300/30 blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_40%)]" />

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="
          relative
          z-10
          w-full
          max-w-sm
          rounded-3xl
          border
          border-white/50
          bg-white/80
          p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
        "
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Login Admin
        </h1>

        <p className="mt-2 mb-8 text-sm text-slate-500">
          Website Informasi Dusun Blaburan
        </p>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              placeholder:text-slate-400
              transition
              focus:border-emerald-500
              focus:outline-none
              focus:ring-4
              focus:ring-emerald-100
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              placeholder:text-slate-400
              transition
              focus:border-emerald-500
              focus:outline-none
              focus:ring-4
              focus:ring-emerald-100
            "
          />

        </div>

<button
  type="submit"
  className="
    mt-7
    w-full
    rounded-xl
    bg-emerald-600
    py-3
    font-semibold
    text-white
    shadow-lg
    transition
    hover:bg-emerald-700
    hover:scale-[1.02]
    hover:shadow-xl
    active:scale-100
  "
>
  Masuk
</button>

      </form>

    </div>
  )
}