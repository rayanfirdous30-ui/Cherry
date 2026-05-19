import { useEffect, useRef, useState } from 'react'
import { Expand, Minimize2 } from 'lucide-react'

export default function Terminal({ messages }) {

  const endRef = useRef(null)

  const [expanded, setExpanded] =
    useState(false)

  useEffect(() => {

    endRef.current?.scrollIntoView({
      behavior: 'smooth'
    })

  }, [messages])

  return (

    <div
      className={`

        absolute
        z-20

        flex
        flex-col

        overflow-hidden

        rounded-[2.5rem]

        border
        border-pink-400/5

        bg-black/10
        backdrop-blur-[24px]

        shadow-[0_0_120px_rgba(255,80,200,0.05)]

        transition-all
        duration-700

        ${expanded
          ? `
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            w-[58%]
            h-[68%]

            px-10
            py-8
          `
          : `
            right-10
            top-12

            w-[390px]
            h-[470px]

            px-7
            py-6
          `
        }
      `}
    >

      {/* HEADER */}

      <div
        className="
          sticky
          top-0
          rounded-t-[2.5rem]

          z-20

          flex
          items-center
          justify-between

          pb-4
          mb-5

          border-b
          border-pink-400/5

          bg-black/10
          backdrop-blur-xl
        "
      >

        <p
          className="
            text-pink-200/80
            tracking-[0.42em]
            text-xs
          "
        >

          CHERRY NEURAL STREAM

        </p>

        <div className="flex items-center gap-5">

          {/* LIVE */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-pink-400
                animate-pulse
              "
            />

            <p
              className="
                text-pink-100/35
                text-xs
                tracking-[0.3em]
              "
            >

              LIVE

            </p>

          </div>

          {/* TOGGLE */}

          <button
            onClick={() =>
              setExpanded(!expanded)
            }
            className="
              text-pink-200/40
              hover:text-pink-200/80

              transition-all
              duration-300
            "
          >

            {expanded
              ? <Minimize2 size={16} />
              : <Expand size={16} />
            }

          </button>

        </div>

      </div>

      {/* SCROLL AREA */}

      <div
        className="
          flex-1
          overflow-y-auto
          pr-2
        "
      >

        {/* FEED */}

        <div className="space-y-5 pt-2 pb-12">

          {messages.map((message, index) => {

            const cleanMessage =
              message.replace('> ', '')

            const isSystem =
              cleanMessage.includes('Initializing') ||
              cleanMessage.includes('connected') ||
              cleanMessage.includes('online') ||
              cleanMessage.includes('Good evening')

            const isUser =
              index % 2 !== 0

            return (

              <div
                key={index}
                className={`
                  transition-all
                  duration-500

                  ${isSystem
                    ? 'opacity-40'
                    : 'opacity-100'}

                  ${isUser
                    ? 'flex justify-end'
                    : 'flex justify-start'}
                `}
              >

                <div
                  className={`
                    max-w-[72%]

                    px-5
                    py-4

                    rounded-[1.8rem]

                    leading-relaxed

                    border

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    ${expanded
                      ? 'text-[16px]'
                      : 'text-[15px]'}

                    ${isSystem
                      ? `
                        border-pink-400/5
                        bg-white/[0.01]
                        text-pink-100/25
                        tracking-[0.15em]
                        uppercase
                        text-xs
                      `
                      : isUser
                      ? `
                        border-pink-400/5
                        bg-pink-500/[0.03]
                        text-pink-100/80
                        text-right
                      `
                      : `
                        border-pink-300/5
                        bg-white/[0.015]
                        text-white/80
                        shadow-[0_0_80px_rgba(255,80,200,0.03)]
                      `
                    }
                  `}
                >

                  {cleanMessage}

                </div>

              </div>

            )

          })}

          <div ref={endRef} />

        </div>

      </div>

    </div>

  )

}