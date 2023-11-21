import { IEventEntity } from "../../domain/entities/eventEntity"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputGetEventDto {
  eventId: string
}

export type OutputGetEventDto = Either<IError, IEventEntity>