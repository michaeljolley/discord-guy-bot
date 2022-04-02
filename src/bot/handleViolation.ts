import { FaunaClient } from '../fauna'
import { IOffense } from '../types/message'

export default async function handleViolation(offendingMessage: IOffense): Promise<void> {
  const discordServer = offendingMessage.guild ? `the ${offendingMessage.guild.name} Discord server` : 'this Discord'
  const messageBody = `Please bear in mind that the makeup of ${discordServer} is very diverse, and some people feel excluded by the use of the term “${offendingMessage.offense}”. Maybe you could try using _people_, _team_, _all_, _folks_, _everyone_, or _yall_? Thanks for helping us make sure everyone feels welcome here.`
  
  let previousNotices = await FaunaClient.getNoticesByUser(offendingMessage.author.id, offendingMessage.guild?.id || '')
  
  await offendingMessage.react('guybot:879023217149358121')

  // Show a little grace. If the person hasn't said something
  // wrong in  over a month, give them a little slack.
  if (previousNotices) {
    const lastMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * -30)
    previousNotices = previousNotices.filter(f => f.createdAt >= lastMonth.getTime())
  }

  // If a repeat offender, put them on blast in the channel
  if (previousNotices && previousNotices.length > 0) {
    await offendingMessage.reply(messageBody)
  } 
  // Send a DM to discreetly let them know about the servers expectations
  else {
    const dmChannel = offendingMessage.author.createDM()
    dmChannel.send(messageBody)
  }

  await FaunaClient.saveNotice({user: offendingMessage.author.id, createdAt: Date.now(), guild: offendingMessage.guild?.id || ''})
}