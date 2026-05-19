import { useState } from 'react'

export default function CommandInput({ onSend }) {

  const [input, setInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!input.trim()) return

    onSend(input)

    setInput('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px]"
    >

      <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4">

        <span className="text-pink-300">
          &gt;
        </span>

        <input
          type="text"
          placeholder="Ask Cherry anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none flex-1 text-white placeholder:text-white/30"
        />

      </div>

    </form>
  )
}