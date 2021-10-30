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

  const firstWords = message.cleanContent.toLocaleLowerCase().split(' ').slice(0, 4)
  const uniqueWords = message.cleanContent.toLocaleLowerCase().split(' ').length
  const lastWords = message.cleanContent.toLocaleLowerCase().split(' ').slice(uniqueWords - 5, uniqueWords )

  const offendingWord = flaggedWords.find(f => firstWords.some(w => w.includes(f))) || flaggedWords.find(f => lastWords.some(w => w.includes(f)))
  
  if (offendingWord !== undefined) {
    const offense = message as IOffense
    offense.offense = offendingWord
    
    await bot.handleViolation(offense)
  }
}