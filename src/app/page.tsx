'use client'
import { BootScreen } from '@/components/BootScreen'
import { LoadingScreen } from '@/components/LoadingScreen'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [showLoading, setShowLoading] = useState(false)
  const [showBootScreen, setShowBootScreen] = useState(true)

  return (
    <>
      <main className="relative h-screen w-screen bg-black text-zinc-100">
        {showBootScreen && <BootScreen {...{ setShowLoading }} />}
        <AnimatePresence>
          {showLoading && (
            <LoadingScreen {...{ setShowBootScreen, setShowLoading }} />
          )}
          {/* <div // z-10
          className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[url(/images/pattern.png)] bg-[length:15px_15px] bg-repeat opacity-30"
        />
        <div // z-10
          className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[radial-gradient(circle,_hsla(0,_0%,_100%,_0.05)_0%,_hsla(0,_0%,_0%,_0.5)_100%)]"
        /> */}
        </AnimatePresence>
      </main>
    </>
  )
}
