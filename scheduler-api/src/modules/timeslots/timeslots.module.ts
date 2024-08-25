import { Module } from '@nestjs/common';
import { TimeSlotsService } from './timeslots.service';
import { TimeslotsController } from './timeslots.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [TimeslotsController],
  providers: [TimeSlotsService],
  imports: [PrismaModule],
})
export class TimeslotsModule {}
