import { IMessage } from "../src/types/message"
import { Notice } from "../src/types/notice"

const guild = {
  id: '987654',
  name: 'Guild'
}

const author = {
  id: '123456',
  createDM: () => {
    return {
      send: () => {}
    }
  }
}

export const safeMessage: IMessage = {
  cleanContent: 'This is a safe message that should not cause any violations.',
  author,
  guild,
  react: () => {},
  reply: () => {}
}

export const badMessageFromStart: IMessage = {
  cleanContent: 'Hey guys, this is a violating message.',
  author,
  guild,
  react: () => {},
  reply: () => {}
}

export const badMessageFromEnd: IMessage = {
  cleanContent: 'This is a violating message. What do you think lads?',
  author,
  guild,
  react: () => {},
  reply: () => {}
}

export const newNotice: Notice = {
  user: '123456',
  guild: '987654',
  createdAt: Date.now()
}

export const oldNotice: Notice = {
  user: '123456',
  guild: '987654',
  createdAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40 * 1).getDate()
}