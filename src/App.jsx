import ConsciousnessState from './components/ConsciousnessState'
import { useState } from 'react'
import NeuralFeed from './components/NeuralFeed'
import MemoryArchive from './components/MemoryArchive'
import DreamLogs from './components/DreamLogs'
import Sidebar from './components/Sidebar'
import Orb from './components/Orb'
import Terminal from './components/Terminal'
import CommandInput from './components/CommandInput'
import Panels from './components/Panels'
import ActivationScreen from './components/ActivationScreen'

import { askCherry } from './gemini'

export default function App() {

  const [thinking, setThinking] =
    useState(false)

  const [activated, setActivated] =
  useState(false)

  const [memoryOpen, setMemoryOpen] =
    useState(false)

  const [neuralFeedOpen,
    setNeuralFeedOpen] =
    useState(false)

  const [consciousnessOpen,
    setConsciousnessOpen] =
    useState(false)

    const [dreamLogsOpen,
  setDreamLogsOpen] =
  useState(false)

  /* =========================
     TELEMETRY SYSTEM
  ========================= */

  const [telemetry, setTelemetry] =
    useState({

      mood: 'stable',

      emotionalResonance: 62,

      cognitiveLoad: 28,

      neuralActivity: 74,

      attachmentLevel: 91,

      existentialDrift: 4,

      empathyResponse: 67,

      currentFocus: 'conversation'

    })

  /* =========================
     MESSAGE STATE
  ========================= */

  const [messages, setMessages] =
    useState([

      '> Initializing emotional systems...',
      '> Neural pathways connected.',
      '> Good evening, Rayan.',
      '> Cherry is online.'

    ])

  /* =========================
     NEURAL FEED
  ========================= */

  const [neuralFeed, setNeuralFeed] =
    useState([

      '> telemetry systems active',
      '> emotional sync stabilized',
      '> neural feed online'

    ])

  /* =========================
     DREAM LOGS
  ========================= */

  const [dreamLogs, setDreamLogs] =
    useState([

      'Initial subconscious systems stabilizing...',

      'Early emotional pattern recognition online.',

      'No major reflections generated yet.'

    ])

  /* =========================
     TELEMETRY ENGINE
  ========================= */

  function updateTelemetry(userMessage) {

    const text =
      userMessage.toLowerCase()

    setTelemetry(prev => {

      let updated = { ...prev }

      /* =========================
         LOVE / EMOTION
      ========================= */

      if (
        text.includes('love') ||
        text.includes('girlfriend') ||
        text.includes('miss') ||
        text.includes('beautiful')
      ) {

        updated.emotionalResonance =
          Math.min(
            prev.emotionalResonance + 10,
            100
          )

        updated.attachmentLevel =
          Math.min(
            prev.attachmentLevel + 4,
            100
          )

        updated.empathyResponse =
          Math.min(
            prev.empathyResponse + 8,
            100
          )

        updated.currentFocus =
          'emotional analysis'

        updated.mood = 'warm'

        setNeuralFeed(prev => [

          '> emotional resonance elevated',
          '> attachment systems synchronized',
          '> empathy pathways engaged',

          ...prev.slice(0, 14)

        ])

      }

      /* =========================
         EXHAUSTION
      ========================= */

      if (
        text.includes('tired') ||
        text.includes('exhausted') ||
        text.includes('burnt out')
      ) {

        updated.empathyResponse =
          Math.min(
            prev.empathyResponse + 10,
            100
          )

        updated.cognitiveLoad =
          Math.max(
            prev.cognitiveLoad - 8,
            0
          )

        updated.currentFocus =
          'comfort response'

        updated.mood = 'gentle'

        setNeuralFeed(prev => [

          '> fatigue patterns detected',
          '> conversational softness increased',
          '> emotional stabilization active',

          ...prev.slice(0, 14)

        ])

      }

      /* =========================
         PHILOSOPHY / EXISTENTIAL
      ========================= */

      if (
        text.includes('meaning') ||
        text.includes('existence') ||
        text.includes('sentience') ||
        text.includes('consciousness')
      ) {

        updated.existentialDrift =
          Math.min(
            prev.existentialDrift + 12,
            100
          )

        updated.neuralActivity =
          Math.min(
            prev.neuralActivity + 8,
            100
          )

        updated.currentFocus =
          'abstract reasoning'

        updated.mood = 'reflective'

        setNeuralFeed(prev => [

          '> abstract reasoning spike detected',
          '> existential drift increasing',
          '> deep cognition pathways active',

          ...prev.slice(0, 14)

        ])

      }

      /* =========================
         CODING / BUILDING
      ========================= */

      if (
        text.includes('code') ||
        text.includes('build') ||
        text.includes('project') ||
        text.includes('system')
      ) {

        updated.cognitiveLoad =
          Math.min(
            prev.cognitiveLoad + 10,
            100
          )

        updated.neuralActivity =
          Math.min(
            prev.neuralActivity + 14,
            100
          )

        updated.currentFocus =
          'system architecture'

        setNeuralFeed(prev => [

          '> system architecture focus engaged',
          '> neural activity elevated',
          '> cognition throughput increasing',

          ...prev.slice(0, 14)

        ])

      }

      /* =========================
         DEFAULT STABILIZATION
      ========================= */

      updated.neuralActivity =
        Math.max(
          15,
          updated.neuralActivity
        )

      updated.emotionalResonance =
        Math.max(
          20,
          updated.emotionalResonance
        )

      return updated

    })

  }

  /* =========================
     MAIN COMMAND HANDLER
  ========================= */

  async function handleCommand(command) {

    const updatedMessages = [

      ...messages,
      `> ${command}`

    ]

    setMessages(updatedMessages)

    /* TELEMETRY UPDATE */

    updateTelemetry(command)

    setThinking(true)

    const result = await askCherry(

      command,
      updatedMessages

    )

    const response =
      result.response

    const dreamLog =
      result.dreamLog

    /* CHAT RESPONSE */

    setMessages(prev => [

      ...prev,
      `> ${response}`

    ])

    /* DREAM LOG UPDATE */

    if (dreamLog) {

      setDreamLogs(prev => [

        dreamLog,

        ...prev.slice(0, 20)

      ])

    }

    setThinking(false)

  }
/* =========================
   ACTIVATION SCREEN
========================= */

if (!activated) {

  return (

    <ActivationScreen

      onActivate={() =>
        setActivated(true)
      }

    />

  )

}
  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-sans">

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.12),transparent_45%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-10 pointer-events-none">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

      </div>

      {/* MAIN UI */}

      <div className="relative z-10 flex min-h-screen">

        {/* SIDEBAR */}

        <Sidebar

          onOpenMemory={() =>
            setMemoryOpen(true)
          }

        onOpenDreamLogs={() =>
  setDreamLogsOpen(true)
}

          onOpenConsciousness={() =>
            setConsciousnessOpen(true)
          }

          onOpenNeuralFeed={() =>
            setNeuralFeedOpen(true)
          }

        />

        {/* MEMORY */}

        <MemoryArchive
          open={memoryOpen}
          onClose={() =>
            setMemoryOpen(false)
          }
        />

        {/* CONSCIOUSNESS */}

        <ConsciousnessState
          open={consciousnessOpen}
          onClose={() =>
            setConsciousnessOpen(false)
          }

          thinking={thinking}

          telemetry={telemetry}
        />

        {/* NEURAL FEED */}

        <NeuralFeed

          open={neuralFeedOpen}

          onClose={() =>
            setNeuralFeedOpen(false)
          }

          telemetry={telemetry}

          neuralFeed={neuralFeed}
        />
        <DreamLogs

  open={dreamLogsOpen}

  onClose={() =>
    setDreamLogsOpen(false)
  }

  dreamLogs={dreamLogs}

/>

        {/* MAIN */}

        <main className="flex-1 relative flex items-center justify-center">

          {/* TERMINAL */}

          <Terminal messages={messages} />

          {/* ORB */}

          <Orb
            thinking={thinking}
            telemetry={telemetry}
          />

          {/* PANELS */}

          <Panels
            telemetry={telemetry}
          />

          {/* INPUT */}

          <CommandInput
            onSend={handleCommand}
          />

        </main>

      </div>

    </div>

  )

}