import { ContactsModule } from './contacts.module';

describe('ContactsModule', () => {
  let usersModule: ContactsModule;

  beforeEach(() => {
    usersModule = new ContactsModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
