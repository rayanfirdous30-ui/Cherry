export default function DreamLogs({

  open,
  onClose,
  dreamLogs

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

          w-[920px]
          h-[740px]

          rounded-[2.5rem]

          border
          border-pink-400/10

          bg-black/70
          backdrop-blur-3xl

          overflow-hidden

          shadow-[0_0_100px_rgba(255,80,200,0.08)]
        "
      >

        {/* AMBIENT GLOW */}

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_top,rgba(255,80,200,0.08),transparent_45%)]

            pointer-events-none
          "
        />

        {/* HEADER */}

        <div
          className="
            relative

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

              ☾

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

                DREAM LOGS

              </h1>

              <p
                className="
                  text-pink-100/40
                  mt-2
                "
              >

                Internal reflections & subconscious cognition

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
            relative

            h-[calc(100%-120px)]

            overflow-y-auto

            px-12
            py-10

            flex
            flex-col
            gap-8
          "
        >

          {[...dreamLogs]
            .reverse()
            .map((log, index) => (

              <div
                key={index}

                className="
                  relative

                  border
                  border-pink-400/10

                  bg-white/[0.025]

                  rounded-[2rem]

                  px-8
                  py-7

                  backdrop-blur-xl

                  shadow-[0_0_50px_rgba(255,80,200,0.03)]

                  animate-in
                  fade-in
                  duration-700
                "
              >

                {/* TOP */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    mb-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-2
                        h-2

                        rounded-full

                        bg-pink-400

                        shadow-[0_0_12px_#ff5ccf]
                      "
                    />

                    <p
                      className="
                        text-pink-300/70
                        text-xs
                        tracking-[0.3em]
                      "
                    >

                      SUBCONSCIOUS REFLECTION

                    </p>

                  </div>

                  <p
                    className="
                      text-pink-100/25
                      text-xs
                    "
                  >

                    dream sequence #{index + 1}

                  </p>

                </div>

                {/* TEXT */}

                <p
                  className="
                    text-white/80

                    text-[17px]

                    leading-[2.1rem]

                    font-light

                    tracking-[0.02em]
                  "
                >

                  {log}

                </p>

              </div>

            ))}

        </div>

      </div>

    </div>

  )

}