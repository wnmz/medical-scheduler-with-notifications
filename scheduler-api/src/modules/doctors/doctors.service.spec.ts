import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Prisma, DoctorSpecsPrice } from 'my-prisma-client';

describe('DoctorsService', () => {
  let service: DoctorsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorsService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a doctor', async () => {
    const createDoctorDto: CreateDoctorDto = {
      name: 'Dr. John Smith',
      email: 'dr.john.smith@example.com',
      gender: 'male',
      birthday: new Date('1970-01-01'),
    };

    const mockDoctor = {
      id: 'some-uuid',
      name: createDoctorDto.name,
      email: createDoctorDto.email,
      gender: createDoctorDto.gender,
      birthday: createDoctorDto.birthday,
    };

    jest.spyOn(prismaService.doctor, 'create').mockResolvedValue(mockDoctor);

    const result = await service.create(createDoctorDto);
    expect(result).toEqual(mockDoctor);
    expect(prismaService.doctor.create).toHaveBeenCalledWith({
      data: createDoctorDto,
    });
  });

  it('should add a new specialization', async () => {
    const specName = 'Cardiology';
    const mockSpec = {
      id: 'abv',
      name: specName,
    };

    jest.spyOn(prismaService.spec, 'create').mockResolvedValue(mockSpec);

    const result = await service.addSpec(specName);
    expect(result).toEqual(mockSpec);
    expect(prismaService.spec.create).toHaveBeenCalledWith({
      data: { name: specName },
    });
  });

  it('should add a doctor to a specialization with a price', async () => {
    const doctorId = 'doctor-uuid';
    const specId = 'abc123';
    const price = 150.0;

    const mockDoctorSpecPrice: DoctorSpecsPrice = {
      id: doctorId,
      doctor_id: doctorId,
      spec_id: specId,
      price: price,
      work_start_time: '9:00',
      work_end_time: '21:00',
    };

    jest
      .spyOn(prismaService.doctorSpecsPrice, 'create')
      .mockResolvedValue(mockDoctorSpecPrice);

    const result = await service.addDoctorToSpec({
      doctorId: doctorId,
      specId: specId,
      price: price,
      work_end_time: '20:00',
    });
    expect(result).toEqual(mockDoctorSpecPrice);
    expect(prismaService.doctorSpecsPrice.create).toHaveBeenCalledWith({
      data: {
        doctor: { connect: { id: doctorId } },
        spec: { connect: { id: specId } },
        price: price,
        work_end_time: '20:00',
      },
    });
  });

  it('should update a doctor', async () => {
    const doctorId = 'doctor-uuid';
    const updateDoctorDto: UpdateDoctorDto = {
      name: 'Dr. John Updated',
      email: 'dr.john.updated@example.com',
      gender: 'male',
      birthday: new Date('1970-01-01'),
    };

    const mockUpdatedDoctor = {
      id: doctorId,
      name: updateDoctorDto.name,
      email: updateDoctorDto.email,
      gender: updateDoctorDto.gender,
      birthday: updateDoctorDto.birthday,
    };

    jest
      .spyOn(prismaService.doctor, 'update')
      .mockResolvedValue(mockUpdatedDoctor);

    const result = await service.update(doctorId, updateDoctorDto);
    expect(result).toEqual(mockUpdatedDoctor);
    expect(prismaService.doctor.update).toHaveBeenCalledWith({
      where: { id: doctorId },
      data: updateDoctorDto,
    });
  });
});
