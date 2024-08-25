import {
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateScheduleDto {
  @ApiProperty({
    example: randomUUID(),
    description: 'ID слота, на который хотим записаться',
  })
  @IsUUID()
  time_slot_id: string;

  @ApiProperty({
    example: '2023-12-01T08:00:00.000Z',
    description: 'Время начала приёма',
  })
  @IsDateString()
  time_from: Date;

  @ApiProperty({ example: randomUUID(), description: 'Идентификатор пациента' })
  @IsString()
  @IsOptional()
  patient_id: string;

  @ApiProperty({
    example: 1,
    description: 'Тип приёма (0 - Первичный, 1 - повторный)',
  })
  @IsInt()
  @Min(0)
  @Max(1)
  type: number;

  @ApiProperty({
    example: 30,
    description: 'Длительность приёма (от 30 до 60 минут)',
  })
  @IsInt()
  @Min(30)
  @Max(60)
  length: number;
}
