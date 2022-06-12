import { v4 as uuidv4 } from 'uuid';

export const generateIds = (): string => {
  return uuidv4()?.toString();
};
