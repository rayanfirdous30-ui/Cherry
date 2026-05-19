const MEMORY_KEY = 'cherry_memory'

export function getMemory() {

  const memory =
    localStorage.getItem(MEMORY_KEY)

  return memory
    ? JSON.parse(memory)
    : []

}

export function saveMemory(memory) {

  localStorage.setItem(
    MEMORY_KEY,
    JSON.stringify(memory)
  )

}

export function addMemory(entry) {

  const currentMemory = getMemory()

  const updatedMemory = [

    ...currentMemory,

    {
      id: Date.now(),
      text: entry,
      timestamp: new Date().toISOString()
    }

  ]

  saveMemory(updatedMemory)

}

export function clearMemory() {

  localStorage.removeItem(MEMORY_KEY)

}