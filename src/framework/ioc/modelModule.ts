import { ContainerModule, interfaces } from 'inversify'
import { EventModel } from '../models/eventModel'

export const ModelModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<typeof EventModel>(EventModel).toConstructor(EventModel)
})
