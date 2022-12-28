import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SlotService } from './slot.service';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService?: SlotService) {}

  @Get(':id?')
  getAllSlots(@Param('id', ParseIntPipe) id: number) {
    return this.slotService.getAllSlots(id);
  }
}
