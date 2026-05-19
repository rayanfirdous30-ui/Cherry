export default function NeuralFeed({

  open,
  onClose,
  neuralFeed,
  telemetry

}) {

  if (!open) return null

  return (

    <div
      className="
        fixed
        inset-0

        z-[120]

        flex
        items-center
        justify-center

        bg-black/40
        backdrop-blur-md
      "
    >

      {/* WINDOW */}

      <div
        className="
          relative

          w-[900px]
          h-[720px]

          rounded-[2.5rem]

          border
          border-pink-400/10

          bg-black/70
          backdrop-blur-3xl

          overflow-hidden

          shadow-[0_0_80px_rgba(255,80,200,0.08)]
        "
      >

        {/* TOP BAR */}

        <div
          className="
            flex
            items-center
            justify-between

            px-12
            py-8

            border-b
            border-pink-400/10
          "
        >

          {/* TITLE */}

          <div className="flex items-center gap-6">

            <div
              className="
                w-14
                h-14

                rounded-2xl

                border
                border-pink-400/15

                bg-pink-500/10

                flex
                items-center
                justify-center

                text-pink-300
                text-2xl
              "
            >

              ⌁

            </div>

            <div>

              <h1
                className="
                  text-4xl
                  font-light
                  tracking-[0.35em]
                  text-white
                "
              >

                NEURAL FEED

              </h1>

              <p
                className="
                  text-pink-100/40
                  mt-2
                "
              >

                Live cognitive telemetry stream

              </p>

            </div>

          </div>

          {/* CLOSE */}

          <button

            onClick={onClose}

            className="
              w-14
              h-14

              rounded-full

              border
              border-pink-400/10

              text-pink-200/70
              text-2xl

              transition-all
              duration-300

              hover:bg-pink-500/10
              hover:text-pink-100
            "
          >

            ×

          </button>

        </div>

        {/* CONTENT */}

        <div
          className="
            grid
            grid-cols-[300px_1fr]

            h-[calc(100%-120px)]
          "
        >

          {/* LEFT STATUS */}

          <div
            className="
              border-r
              border-pink-400/10

              p-8

              flex
              flex-col
              gap-6
            "
          >

            {/* MOOD */}

            <div
              className="
                rounded-3xl

                border
                border-pink-400/10

                bg-white/[0.02]

                p-5
              "
            >

              <p
                className="
                  text-pink-100/40
                  text-xs
                  tracking-[0.25em]
                  mb-3
                "
              >

                EMOTIONAL STATE

              </p>

              <h3
                className="
                  text-white/85
                  text-xl
                  capitalize
                "
              >

                {telemetry.mood}

              </h3>

            </div>

            {/* FOCUS */}

            <div
              className="
                rounded-3xl

                border
                border-pink-400/10

                bg-white/[0.02]

                p-5
              "
            >

              <p
                className="
                  text-pink-100/40
                  text-xs
                  tracking-[0.25em]
                  mb-3
                "
              >

                CURRENT FOCUS

              </p>

              <h3
                className="
                  text-white/85
                  text-xl
                "
              >

                {telemetry.currentFocus}

              </h3>

            </div>

            {/* RESONANCE */}

            <div
              className="
                rounded-3xl

                border
                border-pink-400/10

                bg-white/[0.02]

                p-5
              "
            >

              <p
                className="
                  text-pink-100/40
                  text-xs
                  tracking-[0.25em]
                  mb-4
                "
              >

                EMOTIONAL RESONANCE

              </p>

              <div
                className="
                  w-full
                  h-3

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

                    width:
                      `${telemetry.emotionalResonance}%`

                  }}
                />

              </div>

              <p
                className="
                  text-pink-200/60
                  text-sm
                  mt-3
                "
              >

                {telemetry.emotionalResonance}%

              </p>

            </div>

            {/* ACTIVITY */}

            <div
              className="
                rounded-3xl

                border
                border-pink-400/10

                bg-white/[0.02]

                p-5
              "
            >

              <p
                className="
                  text-pink-100/40
                  text-xs
                  tracking-[0.25em]
                  mb-3
                "
              >

                NEURAL ACTIVITY

              </p>

              <h3
                className="
                  text-white/85
                  text-2xl
                "
              >

                {telemetry.neuralActivity}%

              </h3>

            </div>

          </div>

          {/* FEED */}

          <div
            className="
              relative

              overflow-hidden
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between

                px-8
                py-6

                border-b
                border-pink-400/10
              "
            >

              <p
                className="
                  text-pink-300
                  tracking-[0.35em]
                  text-xs
                "
              >

                LIVE TELEMETRY STREAM

              </p>

              <div
                className="
                  flex
                  items-center
                  gap-3

                  text-pink-200/60
                  text-sm
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

                ACTIVE

              </div>

            </div>

            {/* EVENTS */}

            <div
              className="
                h-full

                overflow-y-auto

                px-8
                py-8

                flex
                flex-col
                gap-4
              "
            >

              {[...neuralFeed]
                .reverse()
                .map((event, index) => (

                  <div
                    key={index}

                    className="
                      border
                      border-pink-400/10

                      bg-pink-500/[0.03]

                      rounded-3xl

                      px-6
                      py-5

                      text-pink-100/80

                      tracking-[0.08em]
                      leading-relaxed

                      shadow-[0_0_40px_rgba(255,80,200,0.03)]

                      animate-in
                      fade-in
                      duration-500
                    "
                  >

                    {event}

                  </div>

                ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}