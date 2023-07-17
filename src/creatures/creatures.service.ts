import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { And, Equal, IsNull, Like, Not, Repository } from 'typeorm';
import { Creature } from './entities/creature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCreatureDto } from './dto/get-creature.dto';
import { Post } from 'src/post/entities/post.entity';
import { isEmpty } from 'lodash';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(Creature)
    private creatureRepository: Repository<Creature>,
  ) {}

  async findCreatureRedBookByType() {
    const animals = await this.findAll({
      specie: 1,
      isRedBook: true,
      limit: 5,
      page: 1,
    });
    const plants = await this.findAll({
      specie: 2,
      isRedBook: true,
      limit: 5,
      page: 1,
    });
    const insect = await this.findAll({
      specie: 3,
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

  async findAll(query: GetCreatureDto) {
    const limit = query?.limit || 10;
    const whereCondition = {};
    const whereConditionOr = {};

    if (query.isRedBook) {
      whereCondition['redbook_level'] = Not(IsNull());
      whereConditionOr['redbook_level'] = Not(IsNull());
    }

    if (query.keyword) {
      whereCondition['name_vn'] = And(
        Like(`%${query.keyword || ''}%`),
        Not(`vodanh`),
      );
      whereConditionOr['name_latin'] = And(
        Like(`%${query.keyword || ''}%`),
        Not(`Chua co ten`),
      );
    } else {
      whereCondition['name_vn'] = Not(`vodanh`);
      whereConditionOr['name_latin'] = Not(`Chua co ten`);
    }

    if (query.specie) {
      whereCondition['species'] = query.specie;
      whereConditionOr['species'] = query.specie;
    }

    if (
      query.classify &&
      query.classify.name &&
      query.classify.value?.length > 0
    ) {
      let name;
      switch (query.classify.name) {
        case 'groups':
          name = 'group';
          break;
        case 'sets':
          name = 'order';
          break;
        case 'family':
          name = 'family';
          break;
        default:
          name = 'group';
      }
      whereCondition[name] = query.classify.value;
      whereConditionOr[name] = query.classify.value;
    }
    const [data, total] = await this.creatureRepository.findAndCount({
      take: limit,
      where:
        isEmpty(whereCondition) && isEmpty(whereConditionOr)
          ? {}
          : [whereCondition, whereConditionOr],
      relations: {
        assets: true,
      },
      skip: (query.page - 1) * limit,
    });
    const totalPage = Math.floor(total / limit) + 1;

    return { data, total, totalPage };
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
