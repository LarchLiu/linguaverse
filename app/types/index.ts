export interface VocabularyItem {
  chinese: string
  english: string
}

export interface PhrasesItem {
  chinese: string
  english: string
}

export interface TipsItem {
  chinese: string
  english: string
  examples: {
    chinese: string
    english: string
    explain: string | null
  }[]
}
