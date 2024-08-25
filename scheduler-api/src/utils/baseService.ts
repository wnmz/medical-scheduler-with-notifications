import { PrismaService } from 'src/modules/prisma/prisma.service';

export class BaseService<T> {
  constructor(private readonly _repo: any) {}

  async findAll(): Promise<T[]> {
    return this._repo.findMany();
  }

  async findOneById(id: string): Promise<T> {
    return this._repo.findUnique({
      where: { id },
    });
  }

  async removeById(id: string): Promise<T> {
    return this._repo.delete({
      where: { id },
    });
  }
}
