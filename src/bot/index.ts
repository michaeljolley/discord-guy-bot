import { Client, Intents } from 'discord.js'
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
    const client = new Client({ 
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
      ]
    })
    FaunaClient.init()

    client.once('ready', () => {
      if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`)
      }
    })
    
    client.on('messageCreate', (data) => bot.onMessage(client, data as unknown as IMessage))

    await client.login(process.env.DISCORD_TOKEN)
  } catch (error) {
    console.log(error)
  }
}

export default bot