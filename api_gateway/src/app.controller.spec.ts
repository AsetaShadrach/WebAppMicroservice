import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: OnboardingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [AppService],
    }).compile();

    appController = app.get<OnboardingController>(OnboardingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
