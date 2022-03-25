import { capitalize, format, formatUserExpenses, secureTrim, secureArrayTrim} from '../formatter';

describe('[Packages | User-domain | Formatter] capitalize', () => {
  test('capitalize should make the first character as a capital letter', () => {
    return expect(capitalize('mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on already capitalized word', () => {
    return expect(capitalize('Mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on numbers', () => {
    return expect(capitalize(123)).toEqual('123');
  });

  test('capitalize should do nothing on strings of numbers', () => {
    return expect(capitalize('123')).toEqual('123');
  });
});

describe('[Packages | User-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public user fields', () => {
    return expect(secureTrim({
      firstName: 'John',
      lastName: 'Smith',
      companyName: 'Pleo',
      ssn: 1,
    })).toEqual(JSON.stringify({
      firstName: 'John',
      lastName: 'Smith',
      companyName: 'Pleo',
    }));
  });
});

describe('[Packages | User-domain | Formatter] formatUserExpenses', () => {
  test('formatUserExpenses should return an instance of userExpeneses that fits the API model, based on the db raw value', () => {
    return expect(formatUserExpenses([{
      first_name: 'john',
      last_name: 'smith',
      company_name: 'Pleo',
      merchant_name: 'deep',
      amount_in_cents: 1000,
      currency: 'CAD',
      status: 'pending',
    }, {
      first_name: 'jeppe',
      last_name: 'rindom',
      company_name: 'pleo',
      merchant_name: 'Cafe 22',
      amount_in_cents: 8000,
      currency: 'DKK',
      status: 'pending'
    }
    ])).toEqual([
      {
        firstName: 'John',
        lastName: 'Smith',
        companyName: 'Pleo',
        merchantName: 'Deep',
        amountInCents: 1000,
        currency: 'CAD',
        status: 'pending',
      },
      {
        firstName: 'Jeppe',
        lastName: 'Rindom',
        companyName: 'pleo',
        merchantName: 'Cafe 22',
        amountInCents: 8000,
        currency: 'DKK',
        status: 'pending',
      }
    ]);
  });
});

describe('[Packages | User-domain | Formatter] format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(format({
      id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      first_name: 'john',
      last_name: 'smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual({
      id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
      firstName: 'John',
      lastName: 'Smith',
      companyName: 'Pleo',
      ssn: 1,
    });
  });
});