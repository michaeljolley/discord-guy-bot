import dotenv from 'dotenv'
import bot from './bot'

import Express from 'express'
const app = Express()
const port = 80

dotenv.config()

bot.run()

app.use(Express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})