import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Creature } from 'src/creatures/entities/creature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creature, User])],
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}
