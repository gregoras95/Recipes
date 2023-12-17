import * as bcrypt from 'bcrypt';


export function encodePassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync(10).toString();

  const hash = bcrypt.hashSync(rawPassword, salt);

  const hashedResult = salt + '|' + hash;

  return hashedResult;
}


