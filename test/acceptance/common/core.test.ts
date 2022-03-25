import { Api } from '../utils/api';
import * as ExpenseService from '../../../packages/domains/expense/model';

describe('Given that we have a healthy service', () => {
  describe('Healtcheck', () => {
    test('Healthcheck route should return positively', (done) => {
      Api.get('/healthcheck')
        .expect(200, done);
    });

    test('Readiness route should return positively', (done) => {
      Api.get('/readycheck')
        .expect(200, done);
    });
  });

  describe('Security', () => {
    test('Should intercept reflected xss attacks', (done) => {
      // Add a get route with a path parameter that may be vulnerable
      Api.get('/some-path?query=5f71591cbfd15b0007481261n8lsr%3cscript%3ealert(1)%3c%2fscript%3emvfsn')
        .expect(406, done);
    });

    test('Should intercept reflected xss attacks', (done) => {
      // Add a get route with a path parameter that may be vulnerable
      Api.get('/some-path?query=5f71591cbfd15b0007481261n8lsr%3cscript%3ealert(1)%3c%2fscript%3emvfsn')
        .expect(406, done);
    });
  });

  describe('Context', () => {
    test('Should return a unique request id in the headers', () => {
      return Api.get('/')
        .expect(404)
        .then((res) => {
          return expect(res.headers['x-request-id']).not.toBeNull();
        });
    });

    test('Should forward inbound request ids in the headers', () => {
      return Api.get('/')
        .set('x-request-id', 'abc')
        .expect(404)
        .then((res) => {
          return expect(res.headers['x-request-id']).toEqual('abc');
        });
    });
  });
});


describe('API testing for Expenses', () => {
  describe('get-expenses-details', () => {
    test('expenses/v1/get-expenses-detail/ route should return positively', (done) => {
      Api.get('expenses/v1/get-expenses-detail/')
        .expect(200, done);
    });

    test('expenses/v1/get-expenses-detail/ should ask for expenseId', (done) => {
      jest.setTimeout(20000);
      const date = new Date('2021-09-21 20:57:40.021428');
      jest.spyOn(ExpenseService, 'getExpenseDetails').mockResolvedValue([{id:'id', userId:'userid',
       dateCreated: date ,merchantName:'Deep', amountInCents :'8000', currency:"DKK", status:'pending'}])
      Api.get('/expenses/v1/get-expenses-detail/')
        .set('expenseId', '3e920f54-49df-4d0b-b11b-e6f08e3a2dca')
        .expect(200)
        .then((res) =>{
          console.log(res)
          return expect(res).toEqual(1);
        });
    });

    test('expenses/v1/get-expenses-detail/ should ask for expenseId', (done) => {
      Api.get('/expenses/v1/get-expenses-detail/')
        .set('expenseId', '3e920f54-49df-4d0b-b11b-e6f08e3a2dca')
        .expect(200)
        .then((res) =>{
          return expect(res).toEqual([
            "{\"merchantName\":\"Cafe 22\",\"amountInCents\":8000,\"currency\":\"DKK\",\"status\":\"pending\"}"
        ]);
        });
    });
  });
});