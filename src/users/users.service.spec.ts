import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create_user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const email = 'test@example.com';
  const firstName = 'Test';
  const lastName = 'User';
  const createdAt = new Date();

  describe('create', () => {
    it('should create and return a new user', async () => {
      const createUserDTO: CreateUserDTO = {
        email,
        firstName,
        lastName,
      };
      const newUser: User = {
        id: 1,
        ...createUserDTO,
        createdAt,
      };
      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);

      const result = await service.create(createUserDTO);
      expect(result).toEqual(newUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const user: User = {
        id: 1,
        email,
        firstName,
        lastName,
        createdAt,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(email);
      expect(result).toEqual(user);
    });
  });
});
