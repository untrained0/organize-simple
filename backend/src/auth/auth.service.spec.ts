import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiKey } from '../database/entities/api-key.entity';

describe('AuthService', () => {
  let authService: AuthService;
  const apiKeyRepositoryMock = {
    findOneBy: jest.mock,
  };

  const apiKeyMock = { id: '550e8400-e29b-41d4-a716-446655440000' } as ApiKey;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(ApiKey),
          useValue: apiKeyRepositoryMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateApiKey()', () => {
    it('should return false if the api key is in invalid format', async () => {
      apiKeyRepositoryMock.findOneBy = jest.fn().mockResolvedValue(null);

      const apiKey = 'invalid-api-key-format';

      const result = await authService.validateApiKey(apiKey);

      expect(apiKeyRepositoryMock.findOneBy).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should return false if the api key does not exists', async () => {
      apiKeyRepositoryMock.findOneBy = jest.fn().mockResolvedValue(null);

      const apiKey = '550e8400-e29b-41d4-a716-446655440001';

      const result = await authService.validateApiKey(apiKey);

      expect(apiKeyRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: apiKey,
      });
      expect(result).toBe(false);
    });

    it('should return true if the api key does exist', async () => {
      apiKeyRepositoryMock.findOneBy = jest.fn().mockResolvedValue(apiKeyMock);

      const result = await authService.validateApiKey(apiKeyMock.id);

      expect(apiKeyRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: apiKeyMock.id,
      });
      expect(result).toBe(true);
    });
  });
});
