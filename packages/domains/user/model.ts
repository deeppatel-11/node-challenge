import { format, formatUserExpenses} from './formatter';
import { readUser, readUserExpenses } from './data/db-user';
import { to } from '@nc/utils/async';
import { User, UserExpenses } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserDetails(userId): Promise<User> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawUser] = await to(readUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return format(rawUser);
}

export async function getUserExpenses(userId): Promise<UserExpenses[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawUser] = await to(readUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return formatUserExpenses(rawUser);
}
