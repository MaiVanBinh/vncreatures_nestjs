import { Module } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creature } from './entities/creature.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creature, User])],
  controllers: [CreaturesController],
  providers: [CreaturesService],
})
export class CreaturesModule {}
