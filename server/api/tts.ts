import { Buffer } from 'node:buffer'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const apiKey = runtimeConfig.ttsApiKey
  try {
    const body = await readBody(event)

    const response = await fetch('https://edgetts.deno.dev/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'zh-CN-YunyangNeural',
        input: body.words,
        voice: 'rate:-0.1|pitch:0.1',
      }),
    })

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`)
    }

    // Get the audio response
    const audioBuffer = await response.arrayBuffer()

    // Set appropriate headers for audio response
    event.node.res.setHeader('Content-Type', 'audio/mpeg')
    return Buffer.from(audioBuffer)
  }
  catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
})
