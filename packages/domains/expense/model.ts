import { format } from './formatter';
import { readExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expenses } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getExpenseDetails(expenseId, searchValue, orderBy, sort, page, pageSize): Promise<Expenses[]> {
  let queryString = `SELECT * FROM expenses WHERE `;
  if (!searchValue && !expenseId) {
    throw BadRequest('expenseId and searchValue properties are both missing.');
  }
  else{
    if(searchValue !== undefined && expenseId === undefined){
      queryString += `merchant_name ILIKE '${searchValue}' or currency ILIKE '${searchValue}' or status ILIKE '${searchValue}'`
    }
    else if(expenseId !== undefined && searchValue === undefined){
      queryString += `id = '${expenseId}'`;
    }
    else if(expenseId !== undefined && searchValue !== undefined){
      queryString += `id = '${expenseId}' and (merchant_name ILIKE '${searchValue}' or currency ILIKE '${searchValue}' or status ILIKE '${searchValue}')`
    }
  }
  if(orderBy !== undefined){
    if(sort !== undefined){
      if(sort === 'ASC' || sort === 'DESC'){
        queryString += `ORDER BY ${orderBy} ${sort}`;
      }
      else{
        throw BadRequest('Invalid sort property.');
      }
    }
    else{
      queryString += `ORDER BY ${orderBy}`;
    }
  }
  let [dbError, rawExpense] = await to(readExpenses(queryString));
  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expense with id ${expenseId} and value ${searchValue}`);
  }

  if((page && !pageSize) || (!page && pageSize)){
    throw BadRequest('The page and pageSize properties are both required for paging.');
  }
  else if (page && pageSize){
    if (isNaN(+page) ||isNaN(+pageSize)){
      throw BadRequest('The page and pageSize properties must be Numbers.');  
    }
    let startIndex = (page-1)* pageSize;
    let endIndex = (page * pageSize);
    if(endIndex >= rawExpense.length){
      endIndex = rawExpense.length;
    }
    rawExpense = rawExpense.slice(startIndex, endIndex);
  }
  return format(rawExpense);
}
