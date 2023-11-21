import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputDeleteEventDto {
  eventId: string
}

export type OutputDeleteEventDto = Either<IError, boolean>