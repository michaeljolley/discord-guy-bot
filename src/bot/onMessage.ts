import { IMessage } from '../types/message'
import bot from './'

export default async function onMessage(message: IMessage): Promise<void> {

  const firstWords = message.cleanContent.toLocaleLowerCase().split(' ').slice(0, 4)
  const uniqueWords = message.cleanContent.toLocaleLowerCase().split(' ').length
  const lastWords = message.cleanContent.toLocaleLowerCase().split(' ').slice(uniqueWords - 5, uniqueWords - 1)

  if (
        firstWords.find(f => f.includes('guys'))
    || lastWords.find(f => f.includes('guys'))) {
      await bot.handleViolation(message)
  }
}