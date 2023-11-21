import { IsNotEmpty, IsUUID } from 'class-validator'
import { IEventEntity } from '../../domain/entities/eventEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputDeleteEvent extends Validatable<InputDeleteEvent> {
  @IsNotEmpty()
  @IsUUID()
  eventId!: string
}

export type OutputDeleteEvent = Either<IError, IEventEntity>