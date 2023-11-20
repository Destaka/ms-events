import { inject, injectable } from "inversify"

import { EventModel } from "../models/eventModel"
import { IEventEntity } from "../../domain/entities/eventEntity"
import { IEventRepository } from "../../business/repositories/iEventRepository"
import { Condition } from "dynamoose"

enum Prefixes {
  events = 'EVENTS'
}

@injectable()
export class EventRepository implements IEventRepository {
  public constructor(@inject(EventModel) private eventModel: typeof EventModel) { }

  async create(input: IEventEntity): Promise<IEventEntity> {
    const pk = Prefixes.events
    const sk = input.eventId

    const result = await this.eventModel.create({
      pk,
      sk,
      ...input,
    })

    delete result?.pk
    delete result?.sk
    delete result?.password

    return result
  }
}