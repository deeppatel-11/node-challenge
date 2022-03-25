import { query } from '@nc/utils/db';

export function readExpenses(queryString) {
  return query(queryString)
    .then((response) => response.rows);
}

