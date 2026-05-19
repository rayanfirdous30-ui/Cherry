import { Canvas, useFrame } from '@react-three/fiber'

import {
  Environment,
  OrbitControls,
  Float,
  Sparkles
} from '@react-three/drei'

import {
  EffectComposer,
  Bloom
} from '@react-three/postprocessing'

import {
  LayerMaterial,
  Fresnel,
  Depth,
  Noise
} from 'lamina'

import {
  useRef,
  useMemo
} from 'react'

import * as THREE from 'three'

/* ---------------- CORE ---------------- */

function ReactorCore({ thinking }) {

  const ref = useRef()

  useFrame((state) => {

    const t = state.clock.getElapsedTime()

    ref.current.rotation.x +=
      thinking ? 0.003 : 0.001

    ref.current.rotation.y +=
      thinking ? 0.005 : 0.0015

    const pulse =
      thinking
        ? 1 + Math.sin(t * 5) * 0.08
        : 1 + Math.sin(t * 2) * 0.04

    ref.current.scale.set(

      pulse + Math.sin(t * 3) * 0.02,

      pulse + Math.cos(t * 2.7) * 0.03,

      pulse + Math.sin(t * 4.2) * 0.015

    )

  })

  return (

    <Float
      speed={thinking ? 2 : 1}
      rotationIntensity={thinking ? 0.4 : 0.15}
      floatIntensity={thinking ? 0.5 : 0.2}
    >

      <mesh ref={ref}>

        <icosahedronGeometry args={[1.45, 18]} />

        <LayerMaterial
          lighting="physical"
          toneMapped={false}
        >

          <Depth
            colorA={thinking ? '#ff59d6' : '#ff4fc8'}
            colorB="#ffd9f6"
            alpha={1}
            mode="normal"
            near={0}
            far={2}
            origin={[1, 1, 1]}
          />

          <Fresnel
            mode="add"
            color="#ffb3ef"
            intensity={thinking ? 2.8 : 1.8}
            power={2}
            bias={0.05}
          />

          <Noise
            mapping="local"
            type="curl"
            scale={thinking ? 2.2 : 1.2}
            colorA="#ff5ccd"
            colorB="#ffe6fa"
            mode="softlight"
          />

        </LayerMaterial>

      </mesh>

    </Float>

  )

}

/* ---------------- PARTICLE FIELD ---------------- */

function EnergyField({ thinking }) {

  const points = useMemo(() => {

    const positions = []

    for (let i = 0; i < 900; i++) {

      const radius =
        Math.random() * 4.5

      const theta =
        Math.random() * Math.PI * 2

      const phi =
        Math.random() * Math.PI * 2

      positions.push(

        radius * Math.sin(theta) * Math.cos(phi),

        radius * Math.sin(theta) * Math.sin(phi),

        radius * Math.cos(theta)

      )

    }

    return new Float32Array(positions)

  }, [])

  return (

    <points>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        size={thinking ? 0.018 : 0.012}
        color="#ff9de6"
        transparent
        opacity={thinking ? 0.7 : 0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />

    </points>

  )

}

/* ---------------- GHOST DEBRIS ---------------- */

function GhostDebris({ thinking }) {

  const debris = useMemo(() => {

    return Array.from({ length: 45 }).map(() => ({

      position: [

        (Math.random() - 0.5) * 8,

        (Math.random() - 0.5) * 8,

        (Math.random() - 0.5) * 4

      ],

      scale:
        Math.random() * 0.025 + 0.003

    }))

  }, [])

  return (

    <>
      {debris.map((d, i) => (

        <mesh
          key={i}
          position={d.position}
        >

          <sphereGeometry
            args={[d.scale, 6, 6]}
          />

          <meshBasicMaterial
            color="#ffc9f2"
            transparent
            opacity={thinking ? 0.25 : 0.12}
          />

        </mesh>

      ))}
    </>

  )

}

/* ---------------- REACTOR RINGS ---------------- */

function ReactorRing({
  radius,
  speed,
  rotation,
  opacity,
  thinking
}) {

  const ring = useRef()

  useFrame((state, delta) => {

    ring.current.rotation.z +=

      delta *

      (thinking
        ? speed * 1.8
        : speed)

  })

  return (

    <mesh
      ref={ring}
      rotation={rotation}
    >

      <torusGeometry
        args={[radius, 0.006, 12, 180]}
      />

      <meshBasicMaterial
        color="#ff8fe0"
        transparent
        opacity={
          thinking
            ? opacity * 1.5
            : opacity
        }
        blending={THREE.AdditiveBlending}
      />

    </mesh>

  )

}

/* ---------------- FRACTURE RING ---------------- */

function FractureRing({ thinking }) {

  const group = useRef()

  useFrame((state, delta) => {

    group.current.rotation.z +=
      delta * (thinking ? 0.18 : 0.05)

  })

  const fragments = useMemo(() => {

    return Array.from({ length: 22 }).map((_, i) => ({

      rotation:
        (Math.PI * 2 * i) / 22,

      width:
        Math.random() * 0.25 + 0.08

    }))

  }, [])

  return (

    <group ref={group}>

      {fragments.map((f, i) => (

        <mesh
          key={i}
          rotation={[0, 0, f.rotation]}
        >

          <torusGeometry
            args={[3.2, 0.01, 4, 20, f.width]}
          />

          <meshBasicMaterial
            color="#ff9be8"
            transparent
            opacity={thinking ? 0.3 : 0.14}
          />

        </mesh>

      ))}

    </group>

  )

}

/* ---------------- MAIN ---------------- */

export default function OrbScene({
  thinking
}) {

  return (

    <div className="absolute inset-0">

      <Canvas
        dpr={[1, 1.2]}
        camera={{
          position: [0, 0, 10],
          fov: 50
        }}
      >

        <ambientLight
          intensity={thinking ? 0.4 : 0.22}
        />

        <pointLight
          position={[0, 0, 0]}
          intensity={thinking ? 12 : 7}
          color="#ff5ccd"
        />

        <EffectComposer>

          <Bloom
            intensity={thinking ? 3.2 : 1.8}
            luminanceThreshold={0}
            luminanceSmoothing={0.95}
          />

        </EffectComposer>

        <EnergyField thinking={thinking} />

        <Sparkles
          count={thinking ? 220 : 120}
          scale={8}
          size={thinking ? 2.4 : 1.2}
          speed={thinking ? 0.8 : 0.25}
          color="#ffb6ef"
        />

        <GhostDebris thinking={thinking} />

        <FractureRing thinking={thinking} />

        <ReactorCore thinking={thinking} />

        <ReactorRing
          radius={2}
          speed={0.05}
          rotation={[0.4, 0.2, 0]}
          opacity={0.12}
          thinking={thinking}
        />

        <ReactorRing
          radius={2.7}
          speed={-0.03}
          rotation={[1.1, 0.5, 0]}
          opacity={0.08}
          thinking={thinking}
        />

        <ReactorRing
          radius={3.3}
          speed={0.02}
          rotation={[0.2, 1, 0]}
          opacity={0.05}
          thinking={thinking}
        />

        <Environment preset="night" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.35}
          autoRotate={!thinking}
          autoRotateSpeed={0.25}
          enableDamping
          dampingFactor={0.08}
        />

      </Canvas>

    </div>

  )

}