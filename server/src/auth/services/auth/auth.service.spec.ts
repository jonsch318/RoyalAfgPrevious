import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {User} from '../../../user/interfaces/user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("signin",() => {
    it('should return accessToken', async function() {
      const user = User
    });
  })

});
