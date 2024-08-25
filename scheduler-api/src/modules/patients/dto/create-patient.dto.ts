import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({
    description: 'The phone number of the patient',
    example: '+1234567890',
  })
  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  phone: string;

  @ApiProperty({
    description: 'The name of the patient',
    example: 'John Doe',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1, { message: 'Name must not be empty' })
  @MaxLength(100, { message: 'Name is too long' })
  name: string;

  @ApiPropertyOptional({
    description: 'The email address of the patient',
    example: 'johndoe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The gender of the patient',
    example: 'male',
  })
  @IsString()
  @MinLength(1, { message: 'Gender must not be empty' })
  gender: string;

  @ApiPropertyOptional({
    description: 'The birthday of the patient in ISO format',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsDateString({}, { message: 'Invalid date format for birthday' })
  @IsOptional()
  birthday: Date;
}
