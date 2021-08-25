export interface IMessage {
  cleanContent: string
  guild: {
    id: string
    name: string
  } | undefined
  author: {
    id: string
    createDM: () => IDMChannel
  }
  react: Function
  reply: Function
}

export interface IDMChannel {
  send: Function
}