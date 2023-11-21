import { injectable, inject } from 'inversify'

import { InputGetEventDto, OutputGetEventDto } from '../dto/getEventDto'
import { IEventRepository, IEventRepositoryToken } from '../repositories/iEventRepository'
import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { EventNotFound, EventReadingFailed } from '../module/errors/events'

@injectable()
export class GetEventUseCase implements IUseCase<InputGetEventDto, OutputGetEventDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputGetEventDto): Promise<OutputGetEventDto> {
    try {
      const event = await this.eventRepository.get(input.eventId)
      console.log('GetEventUseCase::event ? ', event)

      if (!event) {
        return left(EventNotFound)
      }

      return right(event);
    } catch (error) {
      console.log('GetEventUseCase::Error ', error)
      return left(EventReadingFailed)
    }
  }
}