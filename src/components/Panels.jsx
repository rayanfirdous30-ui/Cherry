import { useEffect, useState } from 'react'

export default function Panels({

  telemetry

}) {

  const [time, setTime] =
    useState('')

  const [platform, setPlatform] =
    useState('Unknown')

  const [latency, setLatency] =
    useState(12)

  useEffect(() => {

    const updateTime = () => {

      const now = new Date()

      setTime(

        now.toLocaleTimeString([], {

          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'

        })

      )

    }

    updateTime()

    const interval = setInterval(() => {

      updateTime()

      /* DYNAMIC LATENCY */

      setLatency(

        Math.floor(
          telemetry.neuralActivity / 4
        ) + 6

      )

    }, 1000)

    setPlatform(navigator.platform)

    return () => clearInterval(interval)

  }, [telemetry])

  return (

    <div
      className="
        absolute
        left-24
        bottom-12

        flex
        flex-col
        gap-4

        z-40
      "
    >

      {/* CLOCK */}

      <div
        className="
          w-[260px]

          rounded-[1.8rem]

          border
          border-pink-400/10

          bg-black/20
          backdrop-blur-2xl

          px-6
          py-5

          shadow-[0_0_40px_rgba(255,92,207,0.05)]
        "
      >

        <p
          className="
            text-pink-300
            tracking-[0.3em]
            text-xs
            mb-3
          "
        >

          SYSTEM CLOCK

        </p>

        <h3
          className="
            text-3xl
            font-light
            text-white
          "
        >

          {time}

        </h3>

      </div>

      {/* PLATFORM */}

      <div
        className="
          w-[260px]

          rounded-[1.8rem]

          border
          border-pink-400/10

          bg-black/20
          backdrop-blur-2xl

          px-6
          py-5

          shadow-[0_0_40px_rgba(255,92,207,0.05)]
        "
      >

        <p
          className="
            text-pink-300
            tracking-[0.3em]
            text-xs
            mb-3
          "
        >

          PLATFORM

        </p>

        <h3
          className="
            text-lg
            text-white/80
          "
        >

          {platform}

        </h3>

      </div>

      {/* CONSCIOUSNESS */}

      <div
        className="
          w-[260px]

          rounded-[1.8rem]

          border
          border-pink-400/10

          bg-black/20
          backdrop-blur-2xl

          px-6
          py-5

          shadow-[0_0_40px_rgba(255,92,207,0.05)]
        "
      >

        <div
          className="
            flex
            items-center
            justify-between

            mb-4
          "
        >

          <p
            className="
              text-pink-300
              tracking-[0.3em]
              text-xs
            "
          >

            CONSCIOUSNESS

          </p>

          <div
            className="
              w-2
              h-2

              rounded-full

              bg-pink-400
              animate-pulse

              shadow-[0_0_12px_#ff5ccf]
            "
          />

        </div>

        <div className="space-y-4">

          {/* CURRENT FOCUS */}

          <div>

            <p
              className="
                text-pink-100/40
                text-[10px]
                tracking-[0.25em]
                mb-1
              "
            >

              CURRENT FOCUS

            </p>

            <h3
              className="
                text-white/85
                text-sm
              "
            >

              {telemetry.currentFocus}

            </h3>

          </div>

          {/* EMOTIONAL STATE */}

          <div>

            <p
              className="
                text-pink-100/40
                text-[10px]
                tracking-[0.25em]
                mb-1
              "
            >

              EMOTIONAL STATE

            </p>

            <h3
              className="
                text-white/85
                text-sm capitalize
              "
            >

              {telemetry.mood}

            </h3>

          </div>

          {/* LATENCY */}

          <div>

            <p
              className="
                text-pink-100/40
                text-[10px]
                tracking-[0.25em]
                mb-1
              "
            >

              NEURAL LATENCY

            </p>

            <h3
              className="
                text-white/85
                text-sm
              "
            >

              {latency}ms

            </h3>

          </div>

          {/* RESONANCE */}

          <div>

            <p
              className="
                text-pink-100/40
                text-[10px]
                tracking-[0.25em]
                mb-1
              "
            >

              EMOTIONAL RESONANCE

            </p>

            <div
              className="
                w-full
                h-2

                rounded-full

                bg-white/5
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  rounded-full

                  bg-pink-400

                  transition-all
                  duration-700
                "

                style={{

                  width: `${telemetry.emotionalResonance}%`

                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}