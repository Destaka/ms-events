import { ContainerModule, interfaces } from 'inversify'
import { IEventRepository, IEventRepositoryToken } from '../../business/repositories/iEventRepository'
import { EventRepository } from '../repositories/eventRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEventRepository>(IEventRepositoryToken).to(EventRepository)
})