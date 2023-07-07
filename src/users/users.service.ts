import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindOneParams } from './dto/find-one.dto';

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
    const user = await this.findOneBy({
      id,
    });
    console.log(user);
    return user;
  }

  async findOneBy(findOneParams: FindOneParams) {
    const user = await this.usersRepository.findOne({
      where: {
        ...findOneParams,
      },
    });
    console.log(user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
