import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { CreateEventUseCase } from '../../business/useCases/createEventUseCase'
import { InputCreateEvent, OutputCreateEvent } from '../serializers/inputCreateEvent'

@injectable()
export class CreateEventOperator extends AbstractOperator<InputCreateEvent, OutputCreateEvent> {
  public constructor(@inject(CreateEventUseCase) private createEventUseCase: CreateEventUseCase) {
    super()
  }

  protected async run(input: InputCreateEvent): Promise<OutputCreateEvent> {
    const result = await this.createEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}