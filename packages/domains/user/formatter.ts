import { User} from './types';

const publicUserFields = ['firstName', 'lastName', 'companyName'];

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
