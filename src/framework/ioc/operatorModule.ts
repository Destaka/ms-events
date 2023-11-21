import { ContainerModule, interfaces } from 'inversify'
import { CreateEventOperator } from '../../controller/operators/createEventOperator'
import { GetEventOperator } from '../../controller/operators/getEventOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEventOperator).toSelf()
  bind(GetEventOperator).toSelf()
})