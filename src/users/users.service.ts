import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindOneParams } from './dto/find-one.dto';
import { AuthUserRequest } from './dto/auth-user-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.role = createUserDto.role;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.is_active = true;
    await this.usersRepository.save(user);
    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findOneBy(findOneParams: AuthUserRequest) {
    const user = await this.usersRepository.find({
      where: {
        username: findOneParams.username,
      },
    });
    return user?.[0];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ refresh_token: refreshToken })
      .where('id = :id', { id: userId })
      .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
