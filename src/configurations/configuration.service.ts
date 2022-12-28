import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './entities/configuration.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>,
  ) {}

  findAllWithRelations(eventId: number) {
    return this.configurationRepository.findOne({
      where: {
        id: eventId,
      },
      relations: {
        holidays: true,
        workingHours: true,
        breaks: true,
      },
    });
  }
}
