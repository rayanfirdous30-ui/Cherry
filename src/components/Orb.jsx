import OrbScene from './OrbScene'

export default function Orb({ thinking }) {

  return (

    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        overflow-hidden
        will-change-transform
      "
    >

      {/* OUTER ATMOSPHERIC GLOW */}

      <div
        className={`
          absolute
          pointer-events-none
          w-[650px]
          h-[650px]
          rounded-full
          blur-[170px]
          transition-all
          duration-700

          ${
            thinking
              ? 'bg-pink-500/18 scale-110'
              : 'bg-pink-500/10 scale-100'
          }
        `}
      />

      {/* MID ENERGY GLOW */}

      <div
        className={`
          absolute
          pointer-events-none
          w-[380px]
          h-[380px]
          rounded-full
          blur-[90px]
          transition-all
          duration-500

          ${
            thinking
              ? 'bg-pink-400/18'
              : 'bg-pink-400/8'
          }
        `}
      />

      {/* INNER REACTOR GLOW */}

      <div
        className={`
          absolute
          pointer-events-none
          w-[180px]
          h-[180px]
          rounded-full
          blur-[45px]
          transition-all
          duration-300

          ${
            thinking
              ? 'bg-pink-300/20 scale-105'
              : 'bg-pink-300/10 scale-100'
          }
        `}
      />

      {/* 3D REACTOR */}

      <OrbScene thinking={thinking} />

    </div>

  )

}