import { IMessage, IOffense } from '../types/message'
import bot from './'

const flaggedWords = [
  'guys',
  'lads',
  'chaps',
  'bros',
  'dudes'
]

export default async function onMessage(message: IMessage): Promise<void> {
  const cleanMessage = message
    .cleanContent
    .replace(/[^\A-Za-z\s]/g, '') // filter out characters such as punctuation marks
    .replace('\n', ' ') // convert line breaks to spaces
    .toLocaleLowerCase()
    .split(' ')

  const firstWords = cleanMessage.slice(0, 4)
  const uniqueWords = cleanMessage.length
  const lastWords = cleanMessage.slice(uniqueWords - 5, uniqueWords)

  const offendingWord =
  	flaggedWords.find(f => firstWords.includes(f)) ||
	flaggedWords.find(f => lastWords.includes(f))

  if (offendingWord !== undefined) {
    const offense = message as IOffense
    offense.offense = offendingWord
    
    await bot.handleViolation(offense)
  }
}