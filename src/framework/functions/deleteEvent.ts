import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { DeleteEventOperator } from '../../controller/operators/deleteEventOperator'
import { InputDeleteEvent } from '../../controller/serializers/inputDeleteEvent'
import { EventNotFound } from '../../business/module/errors/events'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(DeleteEventOperator)
  const body = event?.pathParameters as Object

  console.log('DeleteEvent::eventBody => ', body)

  const input = new InputDeleteEvent(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    if (result.value.code == EventNotFound.code) {
      return httpResponse.notFound(result.value)
    }
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})