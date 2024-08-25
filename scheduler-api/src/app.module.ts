import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ConfigModule } from '@nestjs/config';
import { TimeslotsModule } from './modules/timeslots/timeslots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    PatientsModule,
    DoctorsModule,
    SchedulesModule,
    TimeslotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
