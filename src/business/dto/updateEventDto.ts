import { IEventEntity } from "../../domain/entities/eventEntity"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputUpdateEventDto {
  eventId: string
  name?: string
  description?: string
  location?: string
  startDate?: Date
  endDate?: Date
}

export type OutputUpdateEventDto = Either<IError, IEventEntity>