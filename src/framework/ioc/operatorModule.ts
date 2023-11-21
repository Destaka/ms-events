import { ContainerModule, interfaces } from 'inversify'
import { CreateEventOperator } from '../../controller/operators/createEventOperator'
import { GetEventOperator } from '../../controller/operators/getEventOperator'
import { UpdateEventOperator } from '../../controller/operators/updateEventOperator'
import { DeleteEventOperator } from '../../controller/operators/deleteEventOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEventOperator).toSelf()
  bind(GetEventOperator).toSelf()
  bind(UpdateEventOperator).toSelf()
  bind(DeleteEventOperator).toSelf()
})