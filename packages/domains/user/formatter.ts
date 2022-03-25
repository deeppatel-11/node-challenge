import { User, UserExpenses} from './types';

const publicUserFields = ['firstName', 'lastName', 'companyName'];
const publicUserExpensesFields = ['firstName', 'lastName', 'companyName', 'merchantName','amountInCents', 'currency', 'status'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(user: User): string {
  return JSON.stringify(user, publicUserFields);
}

export function format(rawUser): User {
  return {
    id: rawUser.id,
    firstName: capitalize(rawUser.first_name),
    lastName: capitalize(rawUser.last_name),
    companyName: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}

export function secureArrayTrim(userExpenses: UserExpenses[]): string[] {
  const stringArray:string[] = [];
  for(let r in userExpenses){
    stringArray.push(JSON.stringify(userExpenses[r], publicUserExpensesFields));
  }
  return stringArray;
}

export function formatUserExpenses(rawUserExpenses): UserExpenses[] {
  const arrayResults:UserExpenses[] =[];
  for(let r in rawUserExpenses){
    let e = <UserExpenses>{};
    e.firstName = capitalize(rawUserExpenses[r].first_name);
    e.lastName = capitalize(rawUserExpenses[r].last_name);
    e.companyName = rawUserExpenses[r].company_name;
    e.merchantName = capitalize(rawUserExpenses[r].merchant_name);
    e.amountInCents = rawUserExpenses[r].amount_in_cents;
    e.currency = rawUserExpenses[r].currency;
    e.status = rawUserExpenses[r].status;
    arrayResults.push(e);
  }
  return arrayResults;
}
