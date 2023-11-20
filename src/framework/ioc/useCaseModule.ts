import { ContainerModule, interfaces } from 'inversify'
import { CreateEventUseCase } from '../../business/useCases/createEventUseCase'

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEventUseCase).toSelf()
})