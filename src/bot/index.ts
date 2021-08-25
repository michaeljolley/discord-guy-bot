import { Client } from 'discord.js'
import { FaunaClient } from '../fauna'
import onMessage from './onMessage'
import handleViolation from './handleViolation'
import { IMessage } from '../types/message'

const bot =  {
  handleViolation,
  onMessage,
  run
}

async function run(): Promise<void> {
  try {
    const client = new Client({ partials: ["USER", "REACTION", "MESSAGE"] })
    FaunaClient.init()

    client.once('ready', () => {
      if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`)
      }
    })
    
    client.on('message', (data) => bot.onMessage(data as unknown as IMessage))

    await client.login(process.env.DISCORD_TOKEN)
  } catch (error) {
    console.log(error)
  }
}

export default bot