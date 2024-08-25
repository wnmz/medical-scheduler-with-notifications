import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../../utils/baseService';
import { Doctor, Spec, DoctorSpecsPrice } from 'my-prisma-client';
import { CreateDoctorSpecDto } from './dto/create-doctor-spec.dto';

@Injectable()
export class DoctorsService extends BaseService<Doctor> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.doctor);
  }

  async create(createDoctorDto: CreateDoctorDto) {
    return this.prismaService.doctor.create({
      data: createDoctorDto,
    });
  }

  // Метод для добавления новой специализации
  async addSpec(name: string): Promise<Spec> {
    return this.prismaService.spec.create({
      data: { name },
    });
  }

  async addDoctorToSpec(dto: CreateDoctorSpecDto): Promise<DoctorSpecsPrice> {
    return this.prismaService.doctorSpecsPrice.create({
      data: {
        doctor: { connect: { id: dto.doctorId } },
        spec: { connect: { id: dto.specId } },
        price: dto.price,
        work_end_time: dto.work_end_time,
        work_start_time: dto.work_start_time,
      },
    });
  }

  async getAllSpecs(): Promise<DoctorSpecsPrice[]> {
    return this.prismaService.doctorSpecsPrice.findMany();
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    return this.prismaService.doctor.update({
      where: { id },
      data: updateDoctorDto,
    });
  }
}
