import { ContainerModule, interfaces } from 'inversify'
import { CreateEventUseCase } from '../../business/useCases/createEventUseCase'
import { GetEventUseCase } from '../../business/useCases/getEventUseCase'
import { UpdateEventUseCase } from '../../business/useCases/updateEventUseCase'
import { DeleteEventUseCase } from '../../business/useCases/deleteEventUseCase'
import { ListEventsUseCase } from '../../business/useCases/listEventsUseCase'

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEventUseCase).toSelf()
  bind(GetEventUseCase).toSelf()
  bind(UpdateEventUseCase).toSelf()
  bind(DeleteEventUseCase).toSelf()
  bind(ListEventsUseCase).toSelf()
})