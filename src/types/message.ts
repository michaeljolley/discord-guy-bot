import { Snowflake } from "discord.js"

export interface IMessage {
  cleanContent: string
  id: string
  guild: {
    id: string
    name: string
  } | undefined
  author: {
    id: Snowflake
    createDM: () => IDMChannel
  }
  react: Function
  reply: Function
}

export interface IOffense extends IMessage {
  offense: string
}

export interface IDMChannel {
  send: Function
}