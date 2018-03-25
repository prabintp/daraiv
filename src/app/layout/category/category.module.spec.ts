import { CategoryModule } from './category.module';

describe('CategoryModule', () => {
  let usersModule: CategoryModule;

  beforeEach(() => {
    usersModule = new CategoryModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
