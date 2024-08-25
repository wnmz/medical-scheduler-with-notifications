import { IsString, IsDateString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateTimeSlotDto {
  @ApiProperty({
    example: '2024-08-01T08:00:00.000Z',
    description: 'The start time of the time slot',
  })
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    example: '2024-08-01T08:30:00.000Z',
    description: 'The end time of the time slot',
  })
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    example: true,
    description: 'Whether the time slot is available for booking',
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @ApiProperty({
    example: randomUUID(),
    description: 'The UUID of the associated DoctorSpecsPrice',
  })
  @IsString()
  doctorSpecsPriceId: string;
}
