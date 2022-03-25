import { query } from '@nc/utils/db';

export function readUser(userId) {
  return query('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) => response.rows?.[0]);
}

export function readUserExpenses(userId) {
  return query('SELECT u.first_name, u.last_name, u.company_name, e.merchant_name, e.amount_in_cents, e.currency, e.status FROM users as u, expenses as e WHERE u.id = e.user_id and u.id = $1;', [userId])
    .then((response) => response.rows);
}