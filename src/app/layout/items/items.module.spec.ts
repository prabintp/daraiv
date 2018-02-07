import { ItemsModule } from './items.module';

describe('ItemsModule', () => {
  let usersModule: ItemsModule;

  beforeEach(() => {
    usersModule = new ItemsModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
