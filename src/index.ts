import dotenv from 'dotenv'
import { run } from './bot'

import Express from 'express'
const app = Express()
const port = 80

dotenv.config()

run()

app.use(Express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})