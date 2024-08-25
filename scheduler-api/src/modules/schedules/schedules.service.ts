import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from 'my-prisma-client';
import { BaseService } from '../../utils/baseService';

@Injectable()
export class SchedulesService extends BaseService<Schedule> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.schedule);
  }

  async create(dto: CreateScheduleDto) {
    // Получаем временной слот
    const timeslot = await this.prismaService.timeSlot.findUnique({
      where: {
        id: dto.time_slot_id,
      },
    });

    if (!timeslot) {
      throw new BadRequestException('Временной слот не найден!');
    }

    if (!timeslot.isAvailable) {
      throw new BadRequestException('Временной слот недоступен!');
    }

    // Преобразуем время начала записи и вычисляем время окончания записи
    const startTime: Date = new Date(dto.time_from);
    const endTime: Date = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + dto.length);

    // Получаем текущее время в UTC
    const currentTimeUtc: number = new Date().getTime();
    const startTimeUtc: number = startTime.getTime();

    // Проверяем, что запись делается на будущее время
    if (startTimeUtc <= currentTimeUtc) {
      throw new BadRequestException(
        'Невозможно записаться на прошедший временной слот!',
      );
    }

    // Проверяем, что запись укладывается в рамки временного слота
    const timeslotStartUtc: number = new Date(timeslot.startTime).getTime();
    const timeslotEndUtc: number = new Date(timeslot.endTime).getTime();

    if (endTime.getTime() > timeslotEndUtc || startTimeUtc < timeslotStartUtc)
      throw new BadRequestException(
        'Длительность записи превышает длительность временного слота',
      );

    const overlappingAppointment = await this.prismaService.schedule.findFirst({
      where: {
        timeSlotId: dto.time_slot_id,
        OR: [
          // Полное пересечение (частичное или полное)
          {
            AND: [
              {
                startTime: {
                  lt: endTime,
                },
              },
              {
                startTime: {
                  gt: startTime,
                },
              },
            ],
          },
          // Включение в больший временной отрезок
          {
            AND: [
              {
                startTime: {
                  lte: startTime,
                },
              },
              {
                startTime: {
                  gte: new Date(startTime.getTime() - dto.length * 60000),
                },
              },
            ],
          },
        ],
      },
    });

    if (overlappingAppointment) {
      throw new BadRequestException(
        'В этом временном слоте уже существует пересекающаяся запись.',
      );
    }

    // Создаем запись после прохождения всех проверок
    return this.prismaService.schedule.create({
      data: {
        timeSlot: { connect: { id: dto.time_slot_id } },
        patient: { connect: { id: dto.patient_id } },
        startTime: startTime,
        length: dto.length,
        type: dto.type,
      },
    });
  }

  async update(uuid: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prismaService.schedule.update({
      where: { id: uuid },
      data: updateScheduleDto,
    });
  }
}
