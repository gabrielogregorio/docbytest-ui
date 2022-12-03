import { ReactElement } from 'react';
import { paramsType } from '../../core/interfaces/api';

export const GroupExplainedParams = ({ params, title }: { params: paramsType[]; title: string }): ReactElement => {
  if (params.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h3 className="uppercase mb-2 font-semibold text-gray-500">{title}</h3>
      <div className="rounded-md border-2">
        {params.map((queryParam: paramsType) => {
          return (
            <div className="bg-white p-3">
              <div>
                <span className="font-bold">{queryParam.name}</span> <span className="">{queryParam.type}</span>{' '}
              </div>
              <p>any</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
