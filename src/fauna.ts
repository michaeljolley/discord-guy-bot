import { Client, query, ClientConfig } from 'faunadb'
import { Notice } from './types/notice'

export abstract class FaunaClient {

  private static client: Client

  static init(): void {
    if (process.env.FAUNADB_SECRET) {
      const config: ClientConfig = {
        secret: process.env.FAUNADB_SECRET
      }
      this.client = new Client(config)
    }
  }

  private static mapResponse<T>(payload: FaunaDocument): T {
    return {
      ...payload.data,
      _id: payload.ref.value.id
    } as unknown as T
  }

  static async getNoticesByUser(user: String, guild: String): Promise<Notice[] | undefined> {
    if (!this.client) {
      return undefined
    }

    let notices: Notice[] | undefined
    try {
      const response = await this.client.query<FaunaResponse>(
        query.Map(
          query.Paginate(
            query.Match(query.Index("notices_by_user_guild"), user, guild)),
          query.Lambda("notices", query.Get((query.Var("notices"))))
        )
      )
      if (response.data && response.data.length > 0) {
        const data = response.data as FaunaDocument[]
        notices =  data.map(m => this.mapResponse(m))
      }
    }
    catch (err) {
      console.log(`Fauna:getNoticesByUser - ${err}`)
    }
    return notices
  }

  static async saveNotice(notice: Notice): Promise<Notice | undefined> {
    if (!this.client) {
      return undefined
    }

    let savedNotice: Notice | undefined

    try {
      const response = await this.client.query<FaunaDocument>(
        query.Create(query.Collection("notices"), {
          data: notice
        })
      )
      savedNotice = this.mapResponse(response)
    }
    catch (err) {
      console.log(`Fauna:saveNotice - ${err}`)
    }
    return savedNotice
  }
}

interface FaunaResponse {
  data: FaunaDocument[] | [string[]]
}

interface FaunaDocument {
  ref: FaunaRef
  data: Record<string, unknown>
}

interface FaunaRef {
  value: RefValue
}
interface RefValue {
  id: string
}