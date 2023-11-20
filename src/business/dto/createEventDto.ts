import { IEventEntity } from "../../domain/entities/eventEntity"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputCreateEventDto {
  name: string
  description: string
  location: string
  startDate: Date
  endDate: Date
}

export type OutputCreateEventDto = Either<IError, IEventEntity>