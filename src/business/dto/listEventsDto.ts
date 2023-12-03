import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"
import { SortItems, ListEventsResponse } from "../repositories/iEventRepository"

export enum FilterBy {
  LOCATION = 'location',
  DESCRIPTION = 'description'
}

export interface InputListEventsDto {
  sort?: SortItems
  where?: FilterBy
  like?: string
  limit: number
  lastKey?: string
}

export type OutputListEventsDto = Either<IError, ListEventsResponse>