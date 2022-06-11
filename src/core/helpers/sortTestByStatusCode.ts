import { testsType } from '../interfaces/api';

export function sortTestByStatusCode(tests: testsType[]): testsType[] {
  return tests.sort((a, b) => {
    const firstStatus = Number(a.response.statusCode);
    const secondStatus = Number(b.response.statusCode);

    if (firstStatus > secondStatus) {
      return 1;
    }

    if (firstStatus < secondStatus) {
      return -1;
    }

    return 0;
  });
}
