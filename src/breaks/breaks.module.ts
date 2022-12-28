import { Module } from '@nestjs/common';
import { BreaksService } from './breaks.service';
import { BreaksController } from './breaks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Break } from './entities/break.entity';
import { BreakType } from './entities/break_type.entity';

@Module({
  controllers: [BreaksController],
  providers: [BreaksService],
  imports: [TypeOrmModule.forFeature([Break, BreakType])],
  exports: [BreaksService],
})
export class BreaksModule {}
