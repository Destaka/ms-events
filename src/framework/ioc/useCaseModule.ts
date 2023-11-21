import { ContainerModule, interfaces } from 'inversify'
import { CreateEventUseCase } from '../../business/useCases/createEventUseCase'
import { GetEventUseCase } from '../../business/useCases/getEventUseCase'

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEventUseCase).toSelf()
  bind(GetEventUseCase).toSelf()
})