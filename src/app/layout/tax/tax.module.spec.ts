import { TaxModule } from './tax.module';

describe('TaxModule', () => {
  let usersModule: TaxModule;

  beforeEach(() => {
    usersModule = new TaxModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
