import { ContainerModule, interfaces } from 'inversify'
import { CreateEventOperator } from '../../controller/operators/createEventOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEventOperator).toSelf()
})