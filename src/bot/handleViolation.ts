import { FaunaClient } from '../fauna'
import { IMessage } from '../types/message'

export default async function handleViolation(message: IMessage): Promise<void> {
  const discordServer = message.guild ? `the ${message.guild.name} Discord server` : 'this Discord'
  const messageBody = `Please bear in mind that the makeup of ${discordServer} is very diverse, and some people feel excluded by the use of the term “guys”. Maybe you could try using _people_, _team_, _all_, _folks_, _everyone_, or _yall_? Thanks for helping us make sure everyone feels welcome here.`
  
  let previousNotices = await FaunaClient.getNoticesByUser(message.author.id, message.guild?.id || '')
  
  await message.react('guybot:879023217149358121')

  // Show a little grace. If the person hasn't said guy in
  // over a month, give them a little slack.
  if (previousNotices) {
    const lastMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 1)
    previousNotices = previousNotices.filter(f => f.createdAt >= lastMonth.getDate())
  }

  // If a repeat offender, put them on blast in the channel
  if (previousNotices && previousNotices.length > 0) {
    await message.reply(messageBody)
  } 
  // Send a DM to discreetly let them know about the servers expectations
  else {
    const dmChannel = await message.author.createDM()
    dmChannel.send(messageBody)
  }

  await FaunaClient.saveNotice({user: message.author.id, createdAt: Date.now(), guild: message.guild?.id || ''})
}