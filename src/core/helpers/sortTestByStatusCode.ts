import { testsType } from '../interfaces/api';

export function sortTestByStatusCode(tests: testsType[]): testsType[] {
  return tests.sort((a, b) => (Number(a.response.statusCode) > Number(b.response.statusCode) ? 1 : 0));
}
