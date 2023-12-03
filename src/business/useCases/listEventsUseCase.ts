import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { InputListEventsDto, OutputListEventsDto } from '../dto/listEventsDto'
import { IEventRepository, IEventRepositoryToken } from '../repositories/iEventRepository'
import { EventReadingFailed } from '../module/errors/events'
import { IUseCase } from './iUseCase'

@injectable()
export class ListEventsUseCase implements IUseCase<InputListEventsDto, OutputListEventsDto> {
  public constructor(@inject(IEventRepositoryToken) private eventsRepository: IEventRepository) {}

  async exec(input: InputListEventsDto): Promise<OutputListEventsDto> {
    try {
      const events = await this.eventsRepository.list(input);

      return right(events);
    } catch (error) {
      console.log('EventsUseCase::Error ', error)

      return left(EventReadingFailed)
    }
  }
}