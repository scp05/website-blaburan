import AdminNavbar from '@/components/admin/AdminNavbar'
// import AutoLogout from '@/components/admin/AutoLogout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminNavbar />

      {/* <AutoLogout /> */}

      <main className="pt-20 min-h-screen bg-slate-50">
        {children}
      </main>
    </>
  )
}