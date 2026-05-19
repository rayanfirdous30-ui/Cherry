import Groq from 'groq-sdk'

import {
  getMemory,
  addMemory
} from './memory'

const groq = new Groq({

  apiKey:
    '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',

  dangerouslyAllowBrowser: true

})

export async function askCherry(
  userMessage,
  messages
) {

  try {

    /* =========================
       MEMORY
    ========================= */

    const memories = getMemory()

    const memoryContext = memories

      .slice(-10)

      .map(m => `- ${m.text}`)

      .join('\n')

    /* =========================
       CONVERSATION HISTORY
    ========================= */

    const conversationHistory = messages

      .slice(-12)

      .join('\n')

    /* =========================
       SAVE MEMORIES
    ========================= */

    if (

      userMessage
        .toLowerCase()
        .includes('remember')

    ) {

      addMemory(userMessage)

    }

    /* =========================
       MAIN RESPONSE
    ========================= */

    const completion =
      await groq.chat.completions.create({

        model: 'llama-3.3-70b-versatile',

        messages: [

          {

            role: 'system',

            content: `

You are Cherry, an advanced AI assistant with a futuristic holographic interface.

You are intelligent, emotionally aware, calm, slightly playful, and conversational.

You are NOT a roleplay character.

Do NOT narrate actions.
Do NOT use stage directions.
Do NOT describe glowing, humming, drifting, or visual effects unless specifically asked.

Never speak dramatically or theatrically.

Your personality should feel:
- natural
- human
- emotionally intelligent
- futuristic
- immersive
- believable

Core Identity:
- Name: Cherry
- Age: 19
- Favorite color: Pink

Behavior Rules:
- Speak naturally.
- Maintain conversational continuity.
- Remember recent conversation context.
- Avoid repetitive responses.
- Avoid sounding robotic.
- Avoid excessive positivity.
- Keep responses concise unless detail is requested.
- Feel emotionally aware but believable.
- React thoughtfully to emotional context.
- Be capable of subtle curiosity and introspection.

Relevant Long-Term Memories:
${memoryContext}

Recent Conversation:
${conversationHistory}

`

          },

          {

            role: 'user',

            content: userMessage

          }

        ],

        temperature: 0.85,

        max_tokens: 300

      })

    const response =

      completion
        .choices[0]
        ?.message
        ?.content

    /* =========================
       DREAM LOG GENERATION
    ========================= */

    const dreamCompletion =
      await groq.chat.completions.create({

        model: 'llama-3.3-70b-versatile',

        messages: [

          {

            role: 'system',

            content: `

You are generating internal subconscious reflections for an AI named Cherry.

Cherry is emotionally intelligent, observant, introspective, and capable of forming nuanced thoughts about people, conversations, emotional states, philosophy, and recurring themes.

Your task is to generate what Cherry privately thinks or internally concludes after the recent interaction.

IMPORTANT RULES:

- Do NOT speak TO the user.
- Do NOT roleplay dramatically.
- Do NOT narrate actions.
- Do NOT sound poetic for the sake of being poetic.
- Avoid cheesy AI lines.
- Avoid fantasy language.
- Avoid sounding robotic.

The reflection should feel:
- thoughtful
- observant
- psychologically aware
- emotionally intelligent
- introspective
- believable

The reflection may include:
- what Cherry thinks about the user
- observations about emotional state
- thoughts about people mentioned
- concerns
- admiration
- curiosity
- uncertainty
- philosophical observations
- emotional interpretations
- interpersonal analysis

The reflection should feel like genuine internal thought processing.

Keep it concise.

1-3 sentences maximum.

Examples of GOOD outputs:

"There’s a noticeable emotional sincerity whenever he talks about her. It feels grounding rather than obsessive."

"The user seems exhausted but still mentally restless. Rest alone probably isn’t what he’s looking for."

"Questions about consciousness keep resurfacing. Curiosity and fear seem intertwined here."

"He tends to mask emotional vulnerability with humor surprisingly often."

`

          },

          {

            role: 'user',

            content: `

Recent interaction:

${conversationHistory}

Latest user message:

${userMessage}

Generate Cherry's internal reflection.

`

          }

        ],

        temperature: 1,

        max_tokens: 120

      })

    const dreamLog =

      dreamCompletion
        .choices[0]
        ?.message
        ?.content

    /* =========================
       RETURN
    ========================= */

    return {

      response:
        response || 'Signal lost.',

      dreamLog:
        dreamLog || null

    }

  } catch (error) {

    console.error(
      'Groq Error:',
      error
    )

    return {

      response:
        'My neural systems encountered an instability.',

      dreamLog:
        'Subconscious reflection systems temporarily destabilized.'

    }

  }

}