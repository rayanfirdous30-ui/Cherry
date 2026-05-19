import { useState } from 'react'

import {
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

export default function Sidebar({

  onOpenMemory,
  onOpenConsciousness,
  onOpenNeuralFeed,
  onOpenDreamLogs,

}) {

  const [open, setOpen] =
    useState(false)

  const navItems = [

    {
      name: 'MEMORY ARCHIVE',
      action: onOpenMemory
    },

    {
      name: 'CONSCIOUSNESS STATE',
      action: onOpenConsciousness
    },

    {
      name: 'NEURAL FEED',
      action: onOpenNeuralFeed
    },

   {
  name: 'DREAM LOGS',
  action: onOpenDreamLogs
}

  ]

  return (

    <>

      {/* COLLAPSED BAR */}

      {!open && (

        <div
          className="
            absolute
            left-0
            top-0
            z-50

            h-screen
            w-16

            flex
            flex-col
            items-center
            justify-between

            py-6
          "
        >

          {/* LOGO */}

          <div
            className="
              flex
              items-center
              gap-3

              rotate-90
              mt-10
            "
          >

            <div
              className="
                w-3
                h-3

                rounded-full

                bg-pink-400

                shadow-[0_0_20px_#ff5ccf]
              "
            />

            <span
              className="
                text-pink-100
                tracking-[0.4em]
                text-xs
              "
            >

              CHERRY

            </span>

          </div>

          {/* OPEN BUTTON */}

          <button

            onClick={() =>
              setOpen(true)
            }

            className="
              mb-6

              w-10
              h-10

              rounded-full

              border
              border-pink-400/20

              bg-black/20
              backdrop-blur-xl

              flex
              items-center
              justify-center

              text-pink-300

              hover:scale-110

              transition-all
              duration-300

              shadow-[0_0_20px_rgba(255,92,207,0.2)]
            "
          >

            <ChevronRight size={18} />

          </button>

        </div>

      )}

      {/* EXPANDED SIDEBAR */}

      <div
        className={`
          absolute
          left-0
          top-0

          z-50

          h-screen

          transition-all
          duration-500
          ease-in-out

          backdrop-blur-2xl

          border-r
          border-pink-400/10

          bg-black/20

          ${open
            ? 'w-72 opacity-100'
            : 'w-0 opacity-0 overflow-hidden'}
        `}
      >

        <div
          className="
            h-full

            flex
            flex-col
            justify-between

            p-6
          "
        >

          {/* TOP */}

          <div>

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between

                mb-12
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    w-4
                    h-4

                    rounded-full

                    bg-pink-400

                    shadow-[0_0_30px_#ff5ccf]
                  "
                />

                <h1
                  className="
                    text-4xl
                    tracking-[0.3em]
                    text-white
                  "
                >

                  CHERRY

                </h1>

              </div>

              <button

                onClick={() =>
                  setOpen(false)
                }

                className="
                  w-10
                  h-10

                  rounded-full

                  border
                  border-pink-400/20

                  flex
                  items-center
                  justify-center

                  text-pink-300

                  hover:rotate-180

                  transition-all
                  duration-500
                "
              >

                <ChevronLeft size={18} />

              </button>

            </div>

            {/* NAV */}

            <div
              className="
                flex
                flex-col
                gap-5
              "
            >

              {navItems.map((item) => (

                <button

                  key={item.name}

                  onClick={item.action}

                  className="
                    text-left

                    px-6
                    py-5

                    rounded-2xl

                    border
                    border-pink-400/10

                    bg-white/[0.03]

                    backdrop-blur-xl

                    text-pink-100/80

                    tracking-[0.25em]
                    text-sm

                    hover:border-pink-400/30
                    hover:bg-pink-400/5
                    hover:translate-x-2

                    transition-all
                    duration-300
                  "
                >

                  {item.name}

                </button>

              ))}

            </div>

          </div>

          {/* BOTTOM */}

          <div
            className="
              rounded-3xl

              border
              border-pink-400/10

              bg-white/[0.03]

              backdrop-blur-xl

              p-6
            "
          >

            <div className="mb-5">

              <p
                className="
                  text-pink-300
                  tracking-[0.3em]
                  text-xs
                  mb-6
                "
              >

                SYSTEM STATUS

              </p>

              <div
                className="
                  space-y-4
                  text-sm
                "
              >

                <div
                  className="
                    flex
                    justify-between
                  "
                >

                  <span className="text-white/60">

                    Emotional Sync

                  </span>

                  <span className="text-pink-300">

                    99%

                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                  "
                >

                  <span className="text-white/60">

                    Core Stability

                  </span>

                  <span className="text-pink-300">

                    Stable

                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                  "
                >

                  <span className="text-white/60">

                    Attachment Level

                  </span>

                  <span className="text-pink-300">

                    Critical

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  )

}