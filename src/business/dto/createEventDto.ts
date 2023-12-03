import { IEventEntity } from "../../domain/entities/eventEntity"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputCreateEventDto {
  userId: string
  name: string
  description: string
  latitude: string
  longitude: string
  startDate: Date
  endDate: Date
}

export type OutputCreateEventDto = Either<IError, IEventEntity>