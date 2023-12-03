import { IEventEntity } from "../../../domain/entities/eventEntity"
import { EventModel } from "../../models/eventModel"

export const listEventsResultMapper = (event: typeof EventModel): IEventEntity => {
  delete event?.pk
  delete event?.sk

  return event
}