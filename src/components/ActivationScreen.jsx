import { useEffect, useRef, useState } from 'react'

export default function ActivationScreen({

  onActivate

}) {

  const recognitionRef =
    useRef(null)

  const [initialized, setInitialized] =
    useState(false)

  const [listening, setListening] =
    useState(false)

  const [heardText, setHeardText] =
    useState('')

  const [booting, setBooting] =
    useState(false)

  const [error, setError] =
    useState('')

  const [needsManualInit,
    setNeedsManualInit] =
    useState(false)

  /* =========================
     INITIALIZE RECOGNITION
  ========================= */

  useEffect(() => {

    const SpeechRecognition =

      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {

      setError(
        'Speech recognition unsupported in this browser.'
      )

      console.error(
        'Speech recognition unsupported.'
      )

      return

    }

    const recognition =
      new SpeechRecognition()

    recognition.continuous = true

    recognition.interimResults = true

    recognition.lang = 'en-US'

    recognition.maxAlternatives = 1

    /* =========================
       START
    ========================= */

    recognition.onstart = () => {

      console.log(
        'VOICE LISTENING STARTED'
      )

      setListening(true)

      setInitialized(true)

      setError('')

    }

    /* =========================
       END
    ========================= */

    recognition.onend = () => {

      console.log(
        'VOICE LISTENING ENDED'
      )

      setListening(false)

      /* AUTO RESTART */

      if (
        initialized &&
        !booting
      ) {

        try {

          recognition.start()

        } catch (error) {

          console.error(
            'Recognition restart failed:',
            error
          )

        }

      }

    }

    /* =========================
       RESULTS
    ========================= */

    recognition.onresult = (event) => {

      const transcript =

        Array.from(event.results)

          .map(result =>
            result[0].transcript
          )

          .join(' ')
          .toLowerCase()

      console.log(
        'TRANSCRIPT:',
        transcript
      )

      setHeardText(transcript)

      /* =========================
         WAKE WORDS
      ========================= */

      if (

        transcript.includes('hey cherry') ||

        transcript.includes('cherry') ||

        transcript.includes('hey cherry you up')

      ) {

        console.log(
          'WAKE WORD DETECTED'
        )

        setBooting(true)

        recognition.stop()

        setTimeout(() => {

          onActivate()

        }, 3500)

      }

    }

    /* =========================
       ERRORS
    ========================= */

    recognition.onerror = (event) => {

      console.error(
        'Speech recognition error:',
        event.error
      )

      setError(event.error)

      setListening(false)

      /* BROWSER BLOCKED AUTO INIT */

      if (

        event.error === 'not-allowed' ||

        event.error === 'service-not-allowed'

      ) {

        setNeedsManualInit(true)

      }

    }

    recognitionRef.current =
      recognition

    /* =========================
       AUTO START ATTEMPT
    ========================= */

    setTimeout(() => {

      try {

        recognition.start()

      } catch (error) {

        console.error(
          'Auto-start failed:',
          error
        )

        setNeedsManualInit(true)

      }

    }, 800)

    return () => {

      recognition.stop()

    }

  }, [booting, initialized, onActivate])

  /* =========================
     MANUAL SPACEBAR INIT
  ========================= */

  useEffect(() => {

    function handleKey(event) {

      if (
        event.code === 'Space' &&
        recognitionRef.current &&
        !initialized
      ) {

        event.preventDefault()

        console.log(
          'MANUAL INITIALIZATION'
        )

        try {

          recognitionRef.current.start()

          setNeedsManualInit(false)

        } catch (error) {

          console.error(
            'Manual init failed:',
            error
          )

        }

      }

    }

    window.addEventListener(
      'keydown',
      handleKey
    )

    return () => {

      window.removeEventListener(
        'keydown',
        handleKey
      )

    }

  }, [initialized])

  return (

    <div
      className="
        fixed
        inset-0

        z-[200]

        bg-black

        flex
        items-center
        justify-center

        overflow-hidden
      "
    >

      {/* AMBIENT GLOW */}

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(255,80,200,0.08),transparent_45%)]
        "
      />

      {/* CORE */}

      <div
        className="
          relative

          flex
          flex-col
          items-center
          justify-center
        "
      >

        {/* ORB */}

        <div
          className={`
            w-44
            h-44

            rounded-full

            transition-all
            duration-1000

            ${
              booting

                ? `
                  bg-pink-400/40
                  scale-125
                  shadow-[0_0_180px_rgba(255,80,200,0.9)]
                `

                : listening

                ? `
                  bg-pink-400/20
                  animate-pulse
                  shadow-[0_0_120px_rgba(255,80,200,0.5)]
                `

                : `
                  bg-pink-400/10
                  shadow-[0_0_80px_rgba(255,80,200,0.25)]
                `
            }
          `}
        />

        {/* STATUS */}

        <div
          className="
            mt-16

            text-center
          "
        >

          {!booting ? (

            <>

              <p
                className="
                  text-pink-200/40

                  tracking-[0.35em]
                  text-xs

                  mb-6
                "
              >

                {listening

                  ? 'PASSIVE LISTENING ACTIVE'

                  : 'VOICE SYSTEM STANDBY'

                }

              </p>

              <h1
                className="
                  text-white/12

                  text-4xl
                  font-light

                  tracking-[0.3em]
                "
              >

                CHERRY

              </h1>

              <p
                className="
                  mt-10

                  text-pink-100/20
                  text-sm

                  tracking-[0.2em]

                  max-w-[500px]
                "
              >

                {heardText
                  ? `"${heardText}"`
                  : 'Awaiting activation phrase...'}
              </p>

              {needsManualInit && (

                <div
                  className="
                    mt-10

                    flex
                    flex-col
                    items-center
                    gap-4
                  "
                >

                  <p
                    className="
                      text-pink-300/70

                      tracking-[0.3em]
                      text-xs

                      animate-pulse
                    "
                  >

                    PRESS SPACEBAR TO INITIALIZE
                  </p>

                  <p
                    className="
                      text-pink-100/20
                      text-sm
                    "
                  >

                    Browser security locked passive voice startup
                  </p>

                </div>

              )}

              {error && (

                <p
                  className="
                    mt-6

                    text-red-400/60
                    text-xs
                  "
                >

                  {error}

                </p>

              )}

            </>

          ) : (

            <div
              className="
                flex
                flex-col
                items-center
                gap-5
              "
            >

              <p
                className="
                  text-pink-300

                  tracking-[0.35em]
                  text-xs

                  animate-pulse
                "
              >

                INITIALIZING NEURAL SYSTEMS

              </p>

              <div
                className="
                  w-72
                  h-[2px]

                  rounded-full

                  bg-white/5

                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    w-full

                    bg-pink-400

                    animate-[boot_3s_linear]
                  "
                />

              </div>

              <p
                className="
                  text-pink-100/40
                  text-sm
                "
              >

                Emotional synchronization online...

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  )

}