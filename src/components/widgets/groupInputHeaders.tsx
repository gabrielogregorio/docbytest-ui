import { ReactElement } from 'react';
import { contentRequestType } from '@/interfaces/api';
import { MethodRequestAndUrl } from './methodRequestAndUrl';

export const GroupInputHeaders = ({ headers }: { headers: contentRequestType }): ReactElement => {
  return (
    <div>
      <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">Headers</h3>

      {Object.keys(headers).map((keyRunner: string) => {
        return (
          <MethodRequestAndUrl
            key={headers?.[keyRunner]?.toString()}
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
