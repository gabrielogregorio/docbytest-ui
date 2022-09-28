import { generateIds } from '../../core/shared/generateIds';
import { InputParam } from './inputParam';

export const GroupInputHeaders = ({ headers }: { headers: string | number | true | object }) => {
  return (
    <div>
      <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">Headers</h3>

      {Object.keys(headers).map((keyRunner) => {
        return (
          <InputParam
            key={generateIds()}
            label={keyRunner}
            name="auth"
            type="text"
            value={headers?.[keyRunner]?.toString()}
          />
        );
      })}
    </div>
  );
};
