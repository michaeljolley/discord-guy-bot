import dotenv from 'dotenv'
import { Client, Message } from 'discord.js'

dotenv.config()

async function run(): Promise<void> {
  try {
    const client = new Client({ partials: ["USER", "REACTION", "MESSAGE"] })

    client.once('ready', () => {
      if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`)
      }
    })

    client.on('message', async (message: Message) => {

      const firstWords = message.cleanContent.toLocaleLowerCase().split(' ').slice(0, 9)

      if (firstWords.find(f => f.includes('guys'))) {
        const messageBody = `please bear in mind that the makeup of this Discord is very diverse, and some people feel excluded by the use of the term “guys”. Maybe you could try using _people_, _team_, _all_, _folks_, _everyone_, or _yall_? Thanks for helping us make sure everyone feels welcome here.`
        await message.reply(messageBody)
      }
    })

    await client.login(process.env.DISCORD_TOKEN)
  } catch (error) {
    console.log(error)
  }
}

run()

