'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-white pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left"
        >
          <p className="text-slate-500 text-sm md:text-base mb-3">
            Selamat Datang di
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Website Resmi
            <br />
            Dusun Blaburan
          </h1>

          <p className="text-slate-500 text-base md:text-lg leading-8 max-w-xl mx-auto lg:mx-0 mb-8">
            Dusun Blaburan merupakan kawasan yang memiliki potensi alam,
            budaya, serta berbagai UMKM lokal yang terus berkembang sebagai
            bagian dari kehidupan masyarakat.
          </p>

          <a
            href="#profil"
            className="
              inline-flex
              items-center
              justify-center
              w-full
              sm:w-auto
              px-8
              py-4
              rounded-full
              bg-emerald-600
              text-white
              font-medium
              transition
              hover:bg-emerald-500
            "
          >
            Jelajahi Dusun
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          <div
            className="overflow-hidden border border-slate-200 bg-slate-100"
            style={{
              borderRadius: '70px 16px 70px 16px',
            }}
          >
            <img
  src="..//images/sawah.png"
  alt="Pemandangan Dusun"
  className="w-full h-full object-cover"
/>
          </div>

          <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-yellow-400/90 -z-10" />
        </motion.div>

      </div>
    </section>
  )
}