import { Controller } from '@nestjs/common';
import { BreaksService } from './breaks.service';

@Controller('breaks')
export class BreaksController {
  constructor(private readonly breaksService: BreaksService) {}
}
