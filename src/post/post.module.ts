import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreaturesController } from 'src/creatures/creatures.controller';
import { Creature } from 'src/creatures/entities/creature.entity';
import { User } from 'src/users/entities/user.entity';
// import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
