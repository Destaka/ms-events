import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { IEventEntity } from '../../domain/entities/eventEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputCreateEvent extends Validatable<InputCreateEvent> {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsString()
  latitude!: string

  @IsNotEmpty()
  @IsString()
  longitude!: string

  @IsNotEmpty()
  @IsDate()
  startDate!: Date

  @IsNotEmpty()
  @IsDate()
  endDate!: Date
}

export type OutputCreateEvent = Either<IError, IEventEntity>