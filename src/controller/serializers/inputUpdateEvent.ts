import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { IEventEntity } from '../../domain/entities/eventEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputUpdateEvent extends Validatable<InputUpdateEvent> {
  @IsNotEmpty()
  @IsUUID()
  eventId!: string

  @IsNotEmpty()
  @IsString()
  name?: string

  @IsNotEmpty()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsString()
  location?: string

  @IsNotEmpty()
  @IsDate()
  startDate?: Date

  @IsNotEmpty()
  @IsDate()
  endDate?: Date
}

export type OutputUpdateEvent = Either<IError, IEventEntity>