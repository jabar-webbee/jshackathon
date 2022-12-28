import { Test, TestingModule } from '@nestjs/testing';
import { BreaksService } from './breaks.service';
import { Break } from './entities/break.entity';

describe('BreaksService', () => {
  let service: BreaksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreaksService],
    }).compile();

    service = module.get<BreaksService>(BreaksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const breaks: Break[] = [
    {
      id: 1,
      configurationId: 1,
      breakTypeId: 1,
      createdAt: new Date().toISOString(),
      from: '12:00',
      to: '13:00',
    },
  ];
  describe('isSlotOverlappingWithBreak', () => {
    it('should return true if slot overlaps with break', () => {
      const slot = '12:00';
      expect(service.isSlotOverlappingWithBreak(slot, breaks)).toBe(true);
    });

    it('should return false if slot does not overlap with break', () => {
      const slot = '9:00';
      expect(service.isSlotOverlappingWithBreak(slot, breaks)).toBe(false);
    });
  });
});
