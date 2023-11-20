import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputCreateEventDto, OutputCreateEventDto } from '../dto/createEventDto'
import { EventCreationFailed } from '../module/errors/events'
import { IEventRepository, IEventRepositoryToken } from '../repositories/iEventRepository'
import { EventEntity } from '../../domain/entities/eventEntity'

@injectable()
export class CreateEventUseCase implements IUseCase<InputCreateEventDto, OutputCreateEventDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputCreateEventDto): Promise<OutputCreateEventDto> {
    try {

      const eventResult = EventEntity.create(input)

      if (eventResult.isLeft()) {
        return left(EventCreationFailed)
      }

      const event = await this.eventRepository.create(eventResult.value.export())
      console.log('CreateEventUseCase::event ? ', event)
      
      return right(event)
    } catch (error) {
      console.log('CreateEventUseCase::Error ', error)
      return left(EventCreationFailed)
    }
  }
}