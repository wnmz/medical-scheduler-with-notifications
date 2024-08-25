import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../../utils/baseService';
import { Patient } from 'my-prisma-client';

@Injectable()
export class PatientsService extends BaseService<Patient> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.patient);
  }

  async create(createPatientDto: CreatePatientDto) {
    return this.prismaService.patient.create({
      data: createPatientDto,
    });
  }
}
