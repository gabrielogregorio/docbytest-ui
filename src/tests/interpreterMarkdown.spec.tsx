import { render, screen } from '@testing-library/react';
import { InterpreterMarkdown } from '../components/interpreterMarkdown';

import { reInterpreterDefault } from '../core/handlers/default/reInterpreter';
import { renderHandlerMarkdownDefault } from '../core/handlers/default/renderHtmlMarkdow';

test('Interpreter Markdown', () => {
  render(
    <InterpreterMarkdown
      reInterpreter={reInterpreterDefault}
      renderHandlerMarkdown={renderHandlerMarkdownDefault}
      text={`# API subtitle 1 
    
    ## API subtitle 2
    
    ### API subtitle 3
    #### API subtitle 4
    ##### API subtitle 5
    ###### API subtitle 6
    
    Está documentação 
    
    \`\`\`typescript
    import os
    print(os.system(''));
    \`\`\`
  
    [Tabelá de erros](errors_status_table)

    * item2
    * item1
    

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

    `}
    />,
  );

  expect(screen.getByTestId('title-h1').textContent).toEqual('API subtitle 1');
  expect(screen.getByTestId('title-h2').textContent).toEqual('API subtitle 2');
  expect(screen.getByTestId('title-h3').textContent).toEqual('API subtitle 3');
  expect(screen.getByTestId('title-h4').textContent).toEqual('API subtitle 4');
  expect(screen.getByTestId('title-h5').textContent).toEqual('API subtitle 5');
  expect(screen.getByTestId('title-h6').textContent).toEqual('API subtitle 6');

  expect(screen.getAllByTestId('paragraph')[0].textContent).toEqual('Está documentação');
  expect(screen.getByTestId('code').textContent).toEqual(`typescript - import os\n    print(os.system(''));`);
  expect(screen.getByTestId('special').textContent).toEqual('Tabelá de erros - errors_status_table');
  expect(screen.getByTestId('completeList').textContent).toEqual('* item2\n    * item1');

  expect(screen.getByTestId('tbody').textContent).toEqual('| Syntax      | Description |');
  expect(screen.getByTestId('thead').textContent).toEqual(
    '| Header      | Title       |\n| Paragraph   | Text        |',
  );
});
