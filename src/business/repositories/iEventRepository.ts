import { IEventEntity } from "../../domain/entities/eventEntity"

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
}