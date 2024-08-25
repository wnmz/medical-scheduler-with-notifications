import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    description: 'The name of the doctor',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The email of the doctor',
    example: 'johndoe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The gender of the doctor',
    example: 'male',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'The birthday of the doctor',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsDateString({}, { message: 'Invalid date format for birthday' })
  birthday: Date;
}
