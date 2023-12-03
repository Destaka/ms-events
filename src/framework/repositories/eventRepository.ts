import { inject, injectable } from "inversify"

import { EventModel } from "../models/eventModel"
import { IEventEntity } from "../../domain/entities/eventEntity"
import { IEventRepository, ListEventsResponse } from "../../business/repositories/iEventRepository"
import { Condition } from "dynamoose"
import { InputUpdateEventDto } from "../../business/dto/updateEventDto"
import { FilterBy, InputListEventsDto } from "../../business/dto/listEventsDto"
import { listEventsResultMapper } from "./helpers/listEventsResultMapper"
import { queryPagination } from "./helpers/customPagination"

enum Prefixes {
  events = 'EVENTS'
}

enum IndexPrefixes {
  EVENTS_CREATED_AT = 'eventsCreatedAt'
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

    return result
  }

  async get(eventId: string): Promise<IEventEntity> {
    const response = await this.eventModel.query({
      pk: Prefixes.events,
      sk: eventId,
    }).exec()
    const result = response.toJSON()[0]

    delete result?.pk
    delete result?.sk

    return result
  }

  async update(updateProps: InputUpdateEventDto): Promise<IEventEntity> {
    const condition = new Condition().where('eventId').eq(updateProps.eventId)
    const response = await this.eventModel.update({
      pk: Prefixes.events,
      sk: updateProps.eventId,
    }, {
      ...(updateProps?.name && { name: updateProps.name }),
      ...(updateProps?.description && { description: updateProps.description }),
      ...(updateProps?.location && { location: updateProps.location }),
      ...(updateProps?.startDate && { startDate: updateProps.startDate }),
      ...(updateProps?.endDate && { endDate: updateProps.endDate })
    }, {
      condition: condition
    })

    delete response?.pk
    delete response?.sk

    return response
  }

  async delete(eventId: string): Promise<boolean> {
    const response = await this.eventModel.delete({
      pk: Prefixes.events,
      sk: eventId,
    })

    return true
  }

  async list(props: InputListEventsDto): Promise<ListEventsResponse> {
    const queryProps = {
      pk: Prefixes.events,
    }
    const sortOrder = props.sort ?? 'descending'
    const startAt = props.lastKey ? JSON.parse(props.lastKey.replace(/'/g, '')) : null

    let eventsQuery = this.eventModel
      .query(queryProps)
      .using(IndexPrefixes.EVENTS_CREATED_AT)
      .sort(sortOrder)

    if (props.where) {
      switch (props.where) {
        case FilterBy.LOCATION:
          eventsQuery.where(props.where)
            .contains(props.like)
          break;
        case FilterBy.DESCRIPTION:
          eventsQuery.where(props.where)
            .contains(props.like)
          break;

        default:
          eventsQuery.where(props.where)
            .eq(props.like)
          break;
      }
    }

    if (startAt) {
      startAt.startDate = new Date(startAt.startDate).getTime()
    }

    const data = await queryPagination({
      query: eventsQuery,
      data: [],
      limit: props.limit,
      timesQueried: 1,
      count: 0,
      lastKey: startAt,
    })

    data.data = data.data.map((item: IEventEntity) => listEventsResultMapper(item))

    return data
  }
}