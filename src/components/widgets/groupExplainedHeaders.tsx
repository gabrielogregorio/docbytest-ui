import { ReactElement } from 'react';
import { contentRequestType } from '../../core/interfaces/api';

export const GroupExplainedHeaders = ({ headers }: { headers: contentRequestType }): ReactElement => {
  const headersKey: string[] = Object.keys(headers);

  if (headersKey.length === 0) {
    return <div />;
  }
  return (
    <div>
      <h3 className="uppercase mb-2 font-semibold text-gray-500">Headers</h3>
      <div className="rounded-md border-2">
        {headersKey.map((headerKey: string) => {
          return (
            <div className="bg-white p-3">
              <div>
                <span className="font-bold">{headerKey}</span> <span className="">unknown</span> any
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
