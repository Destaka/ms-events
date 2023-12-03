import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator'

import { SortItems, ListEventsResponse } from '../../business/repositories/iEventRepository'
import { FilterBy } from '../../business/dto/listEventsDto'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputListEvents extends Validatable<InputListEvents> {
  @IsOptional()
  @IsIn(Object.values(SortItems))
  sort?: SortItems

  @IsOptional()
  @IsIn(Object.values(FilterBy))
  where?: FilterBy

  @ValidateIf((obj) => obj.where)
  @IsNotEmpty()
  @IsString()
  like?: string

  @IsNotEmpty()
  @IsNumber()
  limit!: number

  @IsOptional()
  @IsString()
  lastKey?: string
}

export type OutputListEvents = Either<IError, ListEventsResponse>