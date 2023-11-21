import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { UpdateEventUseCase } from '../../business/useCases/updateEventUseCase'
import { InputUpdateEvent, OutputUpdateEvent } from '../serializers/inputUpdateEvent'

@injectable()
export class UpdateEventOperator extends AbstractOperator<InputUpdateEvent, OutputUpdateEvent> {
  public constructor(@inject(UpdateEventUseCase) private updateEventUseCase: UpdateEventUseCase) {
    super()
  }

  protected async run(input: InputUpdateEvent): Promise<OutputUpdateEvent> {
    const result = await this.updateEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}