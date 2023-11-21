import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputUpdateEventDto, OutputUpdateEventDto } from '../dto/updateEventDto'
import { EventNotFound, EventUpdateFailed } from '../module/errors/events'
import { IEventRepository, IEventRepositoryToken } from '../repositories/iEventRepository'

@injectable()
export class UpdateEventUseCase implements IUseCase<InputUpdateEventDto, OutputUpdateEventDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputUpdateEventDto): Promise<OutputUpdateEventDto> {
    try {

      const event = await this.eventRepository.update(input)
      console.log('UpdateEventUseCase::event ? ', event)

      if (!event) return left(EventNotFound)
     
      return right(event)
    } catch (error) {
      console.log('UpdateEventUseCase::Error ', error)
      return left(EventUpdateFailed)
    }
  }
}