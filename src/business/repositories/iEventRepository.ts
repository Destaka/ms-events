import { IEventEntity } from "../../domain/entities/eventEntity"
import { InputUpdateEventDto } from "../dto/updateEventDto"

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
  get(eventId: string): Promise<IEventEntity>
  update(updateProps: InputUpdateEventDto): Promise<IEventEntity>
  delete(eventId: string): Promise<boolean>
}