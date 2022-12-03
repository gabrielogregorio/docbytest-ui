import { testsType } from '../interfaces/api';

export function sortTestByStatusCode(tests: testsType[]): testsType[] {
  return tests.sort((first: testsType, second: testsType) => {
    const firstStatus: number = Number(first.response.statusCode);
    const secondStatus: number = Number(second.response.statusCode);

    if (firstStatus > secondStatus) {
      return 1;
    }

    if (firstStatus < secondStatus) {
      return -1;
    }

    return 0;
  });
}
