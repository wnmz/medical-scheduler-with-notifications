import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateDoctorSpecDto } from './dto/create-doctor-spec.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('spec')
  getAllSpecs() {
    return this.doctorsService.getAllSpecs();
  }

  @Post('spec')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Cardiology' },
      },
    },
  })
  addSpec(@Body('name') name: string) {
    return this.doctorsService.addSpec(name);
  }

  @Post('addDoctorToSpec')
  addDoctorToSpec(@Body() createDoctorSpecDto: CreateDoctorSpecDto) {
    return this.doctorsService.addDoctorToSpec(createDoctorSpecDto);
  }
}
