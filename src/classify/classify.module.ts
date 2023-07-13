import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';
import { Group } from './entities/group.entity';
import { Family } from './entities/family.entity';
import { Set } from './entities/set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Species, Group, Set, Family])],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
