'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-red-50
        px-4
        py-2
        text-sm
        font-medium
        text-red-600
        transition
        hover:bg-red-100
      "
    >
      <LogOut size={18} />
      Logout
    </button>
  )
}