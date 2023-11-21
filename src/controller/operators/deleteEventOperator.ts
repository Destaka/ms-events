import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { DeleteEventUseCase } from '../../business/useCases/deleteEventUseCase'
import { InputDeleteEvent, OutputDeleteEvent } from '../serializers/inputDeleteEvent'

@injectable()
export class DeleteEventOperator extends AbstractOperator<InputDeleteEvent, OutputDeleteEvent> {
  public constructor(@inject(DeleteEventUseCase) private deleteEventUseCase: DeleteEventUseCase) {
    super()
  }

  protected async run(input: InputDeleteEvent): Promise<OutputDeleteEvent> {
    const result = await this.deleteEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}