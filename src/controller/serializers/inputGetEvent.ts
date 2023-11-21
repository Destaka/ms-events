import { IsNotEmpty, IsUUID } from 'class-validator'
import { IEventEntity } from '../../domain/entities/eventEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputGetEvent extends Validatable<InputGetEvent> {
  @IsNotEmpty()
  @IsUUID()
  eventId!: string
}

export type OutputGetEvent = Either<IError, IEventEntity>