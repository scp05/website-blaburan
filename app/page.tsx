import Hero from '@/components/landing/Hero'
import ProfilDesa from '@/components/landing/ProfilDesa'
import Statistik from '@/components/landing/Statistik'
import PerangkatDesa from '@/components/landing/PerangkatDesa'
import Umkm from '@/components/landing/Umkm'
import Wisata from '@/components/landing/Wisata'
import Galeri from '@/components/landing/Galeri'
import Berita from '@/components/landing/Berita'
import Kontak from '@/components/landing/Kontak'

export default function Home() {
  return (
    <main>
      <Hero />
      <ProfilDesa />
      <Statistik />
      <PerangkatDesa />
      <Umkm />
      <Wisata />
      <Galeri />
      <Berita />
      <Kontak />
    </main>
  )
}