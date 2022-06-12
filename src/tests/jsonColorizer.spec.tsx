import { render } from '@testing-library/react';
import { JsonColorizer } from '../core/jsonBeautfull';

test('Should colorize json', () => {
  const { container } = render(
    <JsonColorizer
      text={JSON.stringify(
        {
          title: 'title content',
          user: '',
          item: null,
          count: 1,
          type: {
            false: false,
            true: true,
          },
          imgs: [
            {
              id: '1',
              img: 'img/pontinho.png',
            },
          ],
        },
        null,
        4,
      )}
    />,
  );

  expect(container).toMatchSnapshot();
});
