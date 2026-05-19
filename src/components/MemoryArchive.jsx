import { X, BrainCircuit } from 'lucide-react'
import { getMemory, clearMemory } from '../memory'
import { useEffect, useState } from 'react'

export default function MemoryArchive({ open, onClose }) {

  const [memories, setMemories] = useState([])

  useEffect(() => {

    if (open) {

      setMemories(getMemory())

    }

  }, [open])

  if (!open) return null

  function handleClear() {

    clearMemory()

    setMemories([])

  }

  return (

    <div
      className="
        absolute
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-md
      "
    >

      <div
        className="
          relative
          w-[720px]
          h-[620px]
          rounded-[2.5rem]
          border
          border-pink-400/10
          bg-black/40
          backdrop-blur-2xl
          overflow-hidden
          shadow-[0_0_80px_rgba(255,92,207,0.08)]
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            px-10
            pt-10
            pb-6
            border-b
            border-pink-400/10
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-pink-400/10
                flex
                items-center
                justify-center
                border
                border-pink-400/10
              "
            >

              <BrainCircuit
                size={24}
                className="text-pink-300"
              />

            </div>

            <div>

              <h1
                className="
                  text-2xl
                  tracking-[0.3em]
                  text-white
                "
              >

                MEMORY ARCHIVE

              </h1>

              <p className="text-pink-200/40 text-sm mt-2">

                Indexed cognitive recollections

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              w-12
              h-12
              rounded-full
              border
              border-pink-400/10
              flex
              items-center
              justify-center
              text-pink-300
              hover:bg-pink-400/10
              transition-all
              duration-300
            "
          >

            <X size={18} />

          </button>

        </div>

        {/* STATS */}

        <div
          className="
            px-10
            py-6
            flex
            items-center
            justify-between
            border-b
            border-pink-400/10
          "
        >

          <div>

            <p className="text-pink-300 text-xs tracking-[0.3em] mb-2">

              STORED MEMORIES

            </p>

            <h2 className="text-4xl text-white font-light">

              {memories.length}

            </h2>

          </div>

          <button
            onClick={handleClear}
            className="
              px-5
              py-3
              rounded-2xl
              border
              border-pink-400/10
              bg-pink-400/5
              text-pink-200
              hover:bg-pink-400/10
              transition-all
              duration-300
            "
          >

            Clear Archive

          </button>

        </div>

        {/* MEMORY LIST */}

        <div
          className="
            absolute
            top-[220px]
            bottom-0
            left-0
            right-0
            overflow-y-auto
            custom-scrollbar
            px-10
            pb-10
          "
        >

          <div className="space-y-5 pt-6">

            {memories.length === 0 && (

              <div
                className="
                  h-[260px]
                  flex
                  items-center
                  justify-center
                  text-pink-100/30
                  tracking-[0.25em]
                  text-sm
                "
              >

                NO INDEXED MEMORIES

              </div>

            )}

            {[...memories].reverse().map((memory) => (

              <div
                key={memory.id}
                className="
                  rounded-[2rem]
                  border
                  border-pink-400/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-6
                "
              >

                <div className="flex items-center justify-between mb-5">

                  <p className="text-pink-300 text-xs tracking-[0.3em]">

                    INDEXED MEMORY

                  </p>

                  <p className="text-pink-100/30 text-xs">

                    {new Date(memory.timestamp).toLocaleString()}

                  </p>

                </div>

                <p
                  className="
                    text-white/80
                    leading-relaxed
                    text-[15px]
                  "
                >

                  {memory.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}