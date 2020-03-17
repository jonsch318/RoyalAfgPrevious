import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { getModelToken } from '@nestjs/mongoose';
import { WalletSchema, WalletSchemaName } from '../../models/wallet-schema';

describe('WalletService', () => {
  let service: WalletService;

  const wallet = new WalletSchema();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: getModelToken(WalletSchemaName),
          useValue:
        }
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
