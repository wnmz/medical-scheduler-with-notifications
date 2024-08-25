import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PrismaModule } from '../prisma/prisma.module';

describe('PatientsService', () => {
  let service: PatientsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PatientsService],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', async () => {
    const createPatientDto: CreatePatientDto = {
      phone: '1234567890',
      name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'male',
      birthday: new Date('2000-01-01'),
    };

    const mockPatient = {
      id: 'some-uuid',
      ...createPatientDto,
    };

    // Мокаем возвращаемое значение для метода create
    jest.spyOn(prismaService.patient, 'create').mockResolvedValue(mockPatient);

    const result = await service.create(createPatientDto);

    // Проверяем, что метод возвращает корректное значение
    expect(result).toEqual(mockPatient);

    // Проверяем, что метод Prisma был вызван с правильными данными
    expect(prismaService.patient.create).toHaveBeenCalledWith({
      data: createPatientDto,
    });
  });
});
