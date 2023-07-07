import { Injectable } from '@nestjs/common';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { Repository } from 'typeorm';
import { Creature } from './entities/creature.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(Creature)
    private creatureRepository: Repository<Creature>,
  ) {}
  create(createCreatureDto: CreateCreatureDto) {
    return 'This action adds a new creature';
  }

  findAll() {
    return this.creatureRepository.find({
      take: 5,
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
