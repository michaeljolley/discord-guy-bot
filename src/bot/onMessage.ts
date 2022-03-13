import { Client } from 'discord.js'
import { log } from '../common'
import { IMessage, IOffense } from '../types/message'
import bot from './'

const flaggedWords = [
  'guys',
  'lads',
  'chaps',
  'bros',
  'dudes'
]

export default async function onMessage(client: Client, message: IMessage): Promise<void> {
  // If this message is from the bot, disregard.
  if (client.user && client.user.id === message.author.id) {
    log(`msg: ${message.id}: received by bot`)
    return
  }

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

  log(`msg: ${message.id}: received`)

  if (offendingWord !== undefined) {
    const offense = message as IOffense
    offense.offense = offendingWord
    
    log(`msg: ${message.id}: offense found: ${offendingWord}`)

    await bot.handleViolation(offense)
  }
}