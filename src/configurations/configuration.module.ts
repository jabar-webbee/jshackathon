import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  imports: [TypeOrmModule.forFeature([Configuration])],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
