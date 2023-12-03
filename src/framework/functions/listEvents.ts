import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { ListEventsOperator } from '../../controller/operators/listEventsOperator'
import { InputListEvents } from '../../controller/serializers/inputListEvents'
import { httpHandler } from '../utility/httpHandler'
import { httpResponse } from '../utility/httpResponse'
import { container } from '../shared/ioc/container'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ListEventsOperator)

  const payload = {
    ...event.queryStringParameters,
    ...(event.queryStringParameters?.limit && {
      limit: Number(event.queryStringParameters.limit)
    }),
  }

  console.log('ListEvent::payload => ', payload)

  const input = new InputListEvents(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }
  return httpResponse.ok(result.value)
})