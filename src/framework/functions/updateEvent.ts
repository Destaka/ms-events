import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { EventNotFound } from '../../business/module/errors/events'
import { UpdateEventOperator } from '../../controller/operators/updateEventOperator'
import { InputUpdateEvent } from '../../controller/serializers/inputUpdateEvent'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateEventOperator)
  const body = JSON.parse(event?.body as string)
  const { startDate, endDate } = body

  const payload = {
    ...body,
    ...(startDate && { startDate: new Date(startDate) }),
    ...(endDate && { endDate: new Date(endDate) })
  }

  console.log('UpdateEvent::payload => ', payload)

  const input = new InputUpdateEvent(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    if (result.value.code == EventNotFound.code) {
      return httpResponse.notFound(result.value)
    }
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})