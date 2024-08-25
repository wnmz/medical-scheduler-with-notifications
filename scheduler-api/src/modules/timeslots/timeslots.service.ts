import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { TimeSlot } from 'my-prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from 'src/utils/baseService';
import { dateToHHmm } from 'src/utils/timeUtils';

@Injectable()
export class TimeSlotsService extends BaseService<TimeSlot> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.timeSlot);
  }

  async create(slotDto: CreateTimeSlotDto): Promise<TimeSlot> {
    if (slotDto.endTime <= slotDto.startTime) {
      throw new BadRequestException('End time must be after start time.');
    }

    const spec = await this.prismaService.doctorSpecsPrice.findUnique({
      where: {
        id: slotDto.doctorSpecsPriceId,
      },
    });

    if (!spec) throw new BadRequestException('Specialization not found!');

    const slotStartTime = dateToHHmm(new Date(slotDto.startTime));
    const slotEndTime = dateToHHmm(new Date(slotDto.endTime));

    if (slotEndTime > spec.work_end_time) {
      throw new BadRequestException("Slot end time doesn't fit work time!");
    }

    if (slotStartTime < spec.work_start_time) {
      throw new BadRequestException(
        "Slot start time doesn't fit work start time!",
      );
    }

    // Check for overlapping time slots
    const overlappingSlot = await this.prismaService.timeSlot.findFirst({
      where: {
        doctorSpecsPriceId: slotDto.doctorSpecsPriceId,
        OR: [
          {
            startTime: {
              lt: slotDto.endTime, // Existing slot starts before the new slot ends
            },
            endTime: {
              gt: slotDto.startTime, // Existing slot ends after the new slot starts
            },
          },
          {
            startTime: {
              gte: slotDto.startTime, // New slot starts during an existing slot
              lte: slotDto.endTime, // New slot ends during an existing slot
            },
          },
        ],
      },
    });

    if (overlappingSlot) {
      throw new BadRequestException(
        'The time slot overlaps with an existing slot.',
      );
    }

    return this.prismaService.timeSlot.create({
      data: {
        startTime: slotDto.startTime,
        endTime: slotDto.endTime,
        isAvailable: slotDto.isAvailable ?? true,
        doctorSpecsPrice: {
          connect: { id: slotDto.doctorSpecsPriceId },
        },
      },
    });
  }

  update(id: string, updateTimeslotDto: UpdateTimeslotDto) {
    return `This action updates a #${id} timeslot`;
  }
}
