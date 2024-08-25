import { IsString, IsInt, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorSpecDto {
  @ApiProperty({
    example: 'doctor-uuid',
    description: 'The UUID of the doctor',
  })
  @IsString()
  doctorId: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the specialization',
  })
  @IsUUID()
  specId: string;

  @ApiProperty({
    example: 150.0,
    description: 'The price for the specialization service',
  })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    example: '09:00',
    description: 'Start time of work in HH:mm format',
  })
  @IsString()
  @IsOptional()
  work_start_time?: string;

  @ApiPropertyOptional({
    example: '21:00',
    description: 'End time of work in HH:mm format',
  })
  @IsString()
  @IsOptional()
  work_end_time?: string;
}
