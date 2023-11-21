import { injectable, inject } from 'inversify'

import { InputDeleteEventDto, OutputDeleteEventDto } from '../dto/deleteEventDto'
import { IEventRepository, IEventRepositoryToken } from '../repositories/iEventRepository'
import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { EventDeletionFailed, EventNotFound } from '../module/errors/events'

@injectable()
export class DeleteEventUseCase implements IUseCase<InputDeleteEventDto, OutputDeleteEventDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputDeleteEventDto): Promise<OutputDeleteEventDto> {
    try {
      const getResponse = await this.eventRepository.get(input.eventId)
      console.log('DeleteEventUseCase::getResponse ? ', getResponse)

      if (!getResponse) {
        return left(EventNotFound)
      }

      const deleteResponse = await this.eventRepository.delete(input.eventId)
      console.log('DeleteEventUseCase::deleteResponse ? ', deleteResponse)

      return right(deleteResponse);
    } catch (error) {
      console.log('DeleteEventUseCase::Error ', error)
      return left(EventDeletionFailed)
    }
  }
}