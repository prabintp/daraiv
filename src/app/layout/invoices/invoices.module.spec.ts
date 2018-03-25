import { InvoicesModule } from './invoices.module';

describe('InvoicesModule', () => {
  let usersModule: InvoicesModule;

  beforeEach(() => {
    usersModule = new InvoicesModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
