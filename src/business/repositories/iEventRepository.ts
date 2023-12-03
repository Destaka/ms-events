import { IEventEntity } from "../../domain/entities/eventEntity"
import { InputListEventsDto } from "../dto/listEventsDto"
import { InputUpdateEventDto } from "../dto/updateEventDto"

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export enum SortItems {
  ASC = 'ascending',
  DEC = 'descending',
}

export interface ListEventsResponse {
  count: number
  limit: number
  lastKey?: any
  data: IEventEntity[]
  timesQueried: number;
}

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
  get(eventId: string): Promise<IEventEntity>
  update(updateProps: InputUpdateEventDto): Promise<IEventEntity>
  delete(eventId: string): Promise<boolean>
  list(listProps: InputListEventsDto): Promise<ListEventsResponse>
}