import { Injectable } from '@nestjs/common';
import { Break } from './entities/break.entity';

@Injectable()
export class BreaksService {
  private endOfBreak: string;
  isSlotOverlappingWithBreak(slot: string, breaks: Break[]) {
    const brk = breaks.find((brk) => {
      return brk.from <= slot && brk.to >= slot;
    });
    if (brk) {
      this.endOfBreak = brk.to;
    }
    return brk ? true : false;
  }

  getEndOfBreak(): string {
    return this.endOfBreak;
  }
}
