import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { In, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { Set } from './entities/set.entity';
import { Family } from './entities/family.entity';
import { async } from 'rxjs';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Set)
    private readonly setRepository: Repository<Set>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
  ) {}

  async getFilterData() {
    const species = await this.speciesRepository.find({});
    const filterData = await Promise.all(
      species.map(async (item) => {
        const groups = await this.groupRepository.find({
          select: {
            id: true,
            name_latin: true,
            name_vn: true,
            species: {},
          },
          relations: {
            species: true,
          },
          where: {
            species: {
              id: item.id,
            },
          },
        });
        const listGroupId = groups.map((item) => item.id);

        const set = await this.setRepository.find({
          select: {
            id: true,
            name_latin: true,
            name_vn: true,
            group: {},
          },
          relations: {
            group: true,
          },
          where: {
            group: {
              id: In(listGroupId),
            },
          },
        });
        const listSetId = set.map((item) => item.id);

        const family = await this.familyRepository.find({
          select: {
            id: true,
            name_latin: true,
            name_vn: true,
            set: {},
          },
          relations: {
            set: true,
          },
          where: {
            set: {
              id: In(listSetId),
            },
          },
        });
        return {
          ...item,
          groups,
          sets: set,
          family,
        };
      }),
    );

    return filterData;
  }
}
