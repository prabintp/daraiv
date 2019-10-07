import { AccountsModule } from './accounts.module';

describe('AccountsModule', () => {
  let usersModule: AccountsModule;

  beforeEach(() => {
    usersModule = new AccountsModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
