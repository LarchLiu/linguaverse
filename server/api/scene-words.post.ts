import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

const SceneWords = z.object({
  scene_description: z.string(),
  vocabulary: z.array(z.object({
    chinese: z.string(),
    english: z.string(),
  })),
  phrases: z.array(z.object({
    chinese: z.string(),
    english: z.string(),
  })),
  tips: z.array(z.object({
    chinese: z.string(),
    english: z.string(),
    examples: z.array(z.object({
      chinese: z.string(),
      english: z.string(),
      explain: z.string().nullable(),
    })),
  })),
})

const prompt = `你是一位精通中英语言的翻译官，当用户输入一个中文场景描述后需要解析该场景下可能使用到的英文 Vocabulary，根据vocabulary 给出可能会用到的Phrases，最后给出tips，用于指出在该场景使用词汇，短语时需要注意的语法格式问题，并给出示例，示例给出 explain。`

export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const apiKey = runtimeConfig.geminiApiKey
  const apiHost = runtimeConfig.geminiApiHost
  const body = await readBody<{ content: string }>(event)

  if (!body.content)
    return null

  const openai = new OpenAI({
    apiKey,
    baseURL: apiHost,
  })

  const schema = zodResponseFormat(SceneWords, 'scene_words')
  if (schema.json_schema?.schema?.$schema) {
    delete schema.json_schema.schema.$schema
  }

  const response = await openai.beta.chat.completions.parse({
    model: 'gemini-2.5-flash-preview-04-17',
    reasoning_effort: null,
    messages: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: body.content,
      },
    ],
    response_format: schema,
  })

  const jsonData = response.choices[0].message.parsed

  return jsonData
})
