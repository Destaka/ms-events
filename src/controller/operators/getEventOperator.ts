import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { GetEventUseCase } from '../../business/useCases/getEventUseCase'
import { InputGetEvent, OutputGetEvent } from '../serializers/inputGetEvent'

@injectable()
export class GetEventOperator extends AbstractOperator<InputGetEvent, OutputGetEvent> {
  public constructor(@inject(GetEventUseCase) private getEventUseCase: GetEventUseCase) {
    super()
  }

  protected async run(input: InputGetEvent): Promise<OutputGetEvent> {
    const result = await this.getEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}