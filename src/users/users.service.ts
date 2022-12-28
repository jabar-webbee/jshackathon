import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create_user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = this.userRepository.create(createUserDTO);
    return this.userRepository.save(newUser);
  }
}
