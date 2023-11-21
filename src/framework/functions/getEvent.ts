import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { GetEventOperator } from '../../controller/operators/getEventOperator'
import { InputGetEvent } from '../../controller/serializers/inputGetEvent'
import { EventNotFound } from '../../business/module/errors/events'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(GetEventOperator)
  const body = event?.pathParameters as Object

  console.log('CreateEvent::eventBody => ', body)

  const input = new InputGetEvent(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    if (result.value.code == EventNotFound.code) {
      return httpResponse.notFound(result.value)
    }
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})