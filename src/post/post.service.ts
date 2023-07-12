import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll() {
    const limit = 5;
    const whereCondition = {};
    return this.postRepository.find({
      take: limit,
      where: whereCondition,
      relations: {
        assets: true,
      },
    });
  }
}
