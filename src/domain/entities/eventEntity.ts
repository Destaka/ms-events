import { randomUUID } from 'crypto'

import { Either, right } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export interface IEventEntity {
  eventId?: string
  name: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  createdAt?: Date
  updatedAt?: Date
}

export class EventEntity extends AbstractEntity<IEventEntity> {
  static create(props: IEventEntity): Either<IError, EventEntity> {
    const event = new EventEntity({
      ...props,
      eventId: randomUUID(),
    })

    return right(event)
  }
}