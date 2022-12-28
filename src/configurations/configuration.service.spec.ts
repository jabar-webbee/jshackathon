import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration.service';
import { Repository } from 'typeorm';
import { Configuration } from './entities/configuration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let repository: Repository<Configuration>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationService,
        {
          provide: getRepositoryToken(Configuration),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
    repository = module.get<Repository<Configuration>>(
      getRepositoryToken(Configuration),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllWithRelations', () => {
    it('should return a configuration with relations', async () => {
      const eventId = 2;
      const configuration = {
        id: eventId,
        eventType: 'Men Haircut',
        bufferTime: 10,
        visibleDays: 7,
        appointmentsPerSlot: 3,
        slotDuration: 60,
        createdAt: new Date().toISOString(),
        holidays: [],
        workingHours: [],
        breaks: [],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(configuration);

      const result = await service.findAllWithRelations(eventId);
      expect(result).toEqual(configuration);
    });
  });
});
