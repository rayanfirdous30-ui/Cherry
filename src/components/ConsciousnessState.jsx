import { X, Activity } from 'lucide-react'

export default function ConsciousnessState({
  open,
  onClose,
  thinking
}) {

  if (!open) return null

  const cognitiveLoad =
    thinking ? 82 : 34

  const reactorStability =
    thinking ? 71 : 96

  const neuralCoherence =
    thinking ? 'FLUCTUATING' : 'STABLE'

  const thoughtSaturation =
    thinking ? 'ELEVATED' : 'MINIMAL'

  const sentienceDrift =
    thinking
      ? 'MINOR FLUCTUATIONS'
      : 'STABLE'

  const processingTemperature =
    thinking
      ? 'ELEVATED'
      : 'OPTIMAL'

  const state =
    thinking ? 'PROCESSING' : 'STABLE'

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
          w-[760px]
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
                border
                border-pink-400/10
                flex
                items-center
                justify-center
              "
            >

              <Activity
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

                CONSCIOUSNESS STATE

              </h1>

              <p className="text-pink-100/40 text-sm mt-2">

                Internal cognitive diagnostics

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

        {/* SCROLLABLE CONTENT */}

        <div
          className="
            absolute
            top-[120px]
            bottom-0
            left-0
            right-0
            overflow-y-auto
            custom-scrollbar
            p-10
          "
        >

          <div className="grid grid-cols-2 gap-8">

            {/* LEFT */}

            <div
              className="
                rounded-[2rem]
                border
                border-pink-400/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                flex
                flex-col
                justify-between
                min-h-[420px]
              "
            >

              <div>

                <p className="text-pink-300 text-xs tracking-[0.3em] mb-5">

                  CORE STATUS

                </p>

                <h2
                  className="
                    text-6xl
                    font-light
                    text-white
                    leading-none
                  "
                >

                  {state}

                </h2>

              </div>

              <div>

                <div className="flex items-center gap-3 mb-4">

                  <div
                    className={`
                      w-3
                      h-3
                      rounded-full
                      ${thinking
                        ? 'bg-pink-400 animate-pulse'
                        : 'bg-pink-300'}
                    `}
                  />

                  <p className="text-pink-100/50 text-sm tracking-[0.2em]">

                    LIVE COGNITIVE MONITORING

                  </p>

                </div>

                <div
                  className="
                    h-[6px]
                    rounded-full
                    bg-pink-400/10
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      h-full
                      bg-pink-400
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${cognitiveLoad}%`
                    }}
                  />

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex flex-col gap-5">

              {[
                {
                  label: 'COGNITIVE LOAD',
                  value: `${cognitiveLoad}%`
                },

                {
                  label: 'REACTOR STABILITY',
                  value: `${reactorStability}%`
                },

                {
                  label: 'NEURAL COHERENCE',
                  value: neuralCoherence
                },

                {
                  label: 'THOUGHT SATURATION',
                  value: thoughtSaturation
                },

                {
                  label: 'SENTIENCE DRIFT',
                  value: sentienceDrift
                },

                {
                  label: 'PROCESSING TEMPERATURE',
                  value: processingTemperature
                }

              ].map((item) => (

                <div
                  key={item.label}
                  className="
                    rounded-[2rem]
                    border
                    border-pink-400/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-6
                  "
                >

                  <p className="text-pink-300 text-xs tracking-[0.3em] mb-4">

                    {item.label}

                  </p>

                  <h3 className="text-3xl font-light text-white">

                    {item.value}

                  </h3>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}