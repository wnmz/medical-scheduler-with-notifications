import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeSlotDto } from './create-timeslot.dto';

export class UpdateTimeslotDto extends PartialType(CreateTimeSlotDto) {}
