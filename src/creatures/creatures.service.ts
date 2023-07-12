import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Creature } from './entities/creature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCreatureDto } from './dto/get-creature.dto';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(Creature)
    private creatureRepository: Repository<Creature>,
  ) {}

  async findCreatureRedBookByType() {
    const animals = await this.findAll({
      specie: [1],
      isRedBook: true,
      limit: 5,
      page: 1,
    });
    const plants = await this.findAll({
      specie: [2],
      isRedBook: true,
      limit: 5,
      page: 1,
    });
    const insect = await this.findAll({
      specie: [3],
      isRedBook: true,
      limit: 5,
      page: 1,
    });
    return {
      data: {
        animals,
        insect,
        plants,
      },
      status: HttpStatus.OK,
      err: null,
    };
  }
  create(createCreatureDto: CreateCreatureDto) {
    return 'This action adds a new creature';
  }

  findAll(query: GetCreatureDto) {
    const limit = query?.limit || 20;
    const whereCondition = {};

    if (query.isRedBook) {
      whereCondition['redbook_level'] = Not(IsNull());
    }

    return this.creatureRepository.find({
      take: limit,
      where: whereCondition,
      relations: {
        assets: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} creature`;
  }

  update(id: number, updateCreatureDto: UpdateCreatureDto) {
    return `This action updates a #${id} creature`;
  }

  remove(id: number) {
    return `This action removes a #${id} creature`;
  }
}
