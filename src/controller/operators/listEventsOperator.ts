import { injectable, inject } from 'inversify'
import { ListEventsUseCase } from '../../business/useCases/listEventsUseCase'

import { left, right } from '../../framework/shared/either'
import { OutputListEvents } from '../serializers/inputListEvents'
import { InputListEvents } from '../serializers/inputListEvents'
import { AbstractOperator } from './abstractOperator'

@injectable()
export class ListEventsOperator extends AbstractOperator<InputListEvents, OutputListEvents> {
  public constructor(@inject(ListEventsUseCase) private listEventsUseCase: ListEventsUseCase) {
    super()
  }

  protected async run(input: InputListEvents): Promise<OutputListEvents> {
    const result = await this.listEventsUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}