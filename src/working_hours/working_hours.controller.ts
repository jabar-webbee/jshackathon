import { Controller } from '@nestjs/common';
import { WorkingHoursService } from './working_hours.service';

@Controller('working-hours')
export class WorkingHoursController {
  constructor(private readonly workingHoursService: WorkingHoursService) {}
}
