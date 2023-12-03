import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { httpResponse } from '../utility/httpResponse'
import { container } from '../shared/ioc/container'
import { CreateEventOperator } from '../../controller/operators/createEventOperator'
import { InputCreateEvent } from '../../controller/serializers/inputCreateEvent'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(CreateEventOperator)
  const body = JSON.parse(event?.body as string)
  const { startDate, endDate } = body

  const payload = {
    ...body,
    ...(startDate && { startDate: new Date(startDate) }),
    ...(endDate && { endDate: new Date(endDate) }),
    userId: event.requestContext?.authorizer?.userId
  }

  console.log('CreateEvent::payload => ', payload)

  const input = new InputCreateEvent(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})