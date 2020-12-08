import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './users.service';

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  creat: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService, // real

        // fake
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('createAccount', () => {
    it('should fail if user exist', async () => {
      userRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'alsflaslalalal',
      });
      // findOne is going to return above ( faking ) value
      const result = await service.createAcount({
        email: '',
        password: '',
        role: 0,
      });
      console.log('result', result);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });
  });

  it('should createAcount', () => {});

  it('should login', () => {
    expect(service).toBeDefined();
  });

  it('should findById', () => {});

  it('should editProfile', () => {});

  it('should verifyEmail', () => {});
  it.todo('createAcount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
