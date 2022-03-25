import { capitalize, format} from '../formatter';

describe('[Packages | Expenses-domain | Formatter] capitalize', () => {
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


describe('[Packages | Expenses-domain | Formatter] format', () => {
    test('format should return an instance of Expeneses that fits the API model, based on the db raw value', () => {
      return expect(format([{
        id: '285a5b8e-fb44-4763-9c71-9bd445b2783a'
        merchant_name: 'deep',
        amount_in_cents: 1000,
        currency: 'CAD',
        user_id: '3d16547a-79f6-4f62-9034-d3bfb31fb37c',
        date_created: 2021-09-19T00:57:40.021Z,
        status: 'pending',
      }, {
        id: 'f20866f9-7d46-45f2-822c-4b568e216a13',
        merchant_name: 'cafe 22',
        amount_in_cents: 8000,
        currency: 'DKK',
        user_id: '3d16547a-79f6-4f62-9034-d3bfb31fb37c',
        date_created: 2021-09-19T00:57:40.021Z,
        status: 'pending',
      }
      ])).toEqual([
        {
            id: '285a5b8e-fb44-4763-9c71-9bd445b2783a'
            merchantName: 'Deep',
            amountInCents: 1000,
            currency: 'CAD',
            userId: '3d16547a-79f6-4f62-9034-d3bfb31fb37c',
            dateCreated: 2021-09-19T00:57:40.021Z,
            status: 'pending',
        },
        {
            id: 'f20866f9-7d46-45f2-822c-4b568e216a13',
            merchantName: 'Cafe 22',
            amountInCents: 8000,
            currency: 'DKK',
            userId: '3d16547a-79f6-4f62-9034-d3bfb31fb37c',
            dateCreated: 2021-09-19T00:57:40.021Z,
            status: 'pending'
        }
      ]);
    });
  });
  