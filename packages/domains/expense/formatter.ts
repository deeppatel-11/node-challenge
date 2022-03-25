import { Expenses } from './types';

const publicFields = ['merchantName', 'amountInCents', 'currency', 'status'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(expense: Expenses[]): string[] {
  const results : string[] = [];
  for(let e in expense){
    results.push(JSON.stringify(expense[e], publicFields))
  }
  return results;
}

export function format(rawExpense): Expenses[] {
  let arrayResults:Expenses[] =[];
  for(let r in rawExpense){
    let e = <Expenses>{};
    e.id = rawExpense[r].id;
    e.merchantName = capitalize(rawExpense[r].merchant_name);
    e.amountInCents = rawExpense[r].amount_in_cents;
    e.currency = rawExpense[r].currency;
    e.userId = rawExpense[r].user_id;
    e.dateCreated = rawExpense[r].date_created;
    e.status = rawExpense[r].status;
    arrayResults.push(e);
  }
  return arrayResults;
}