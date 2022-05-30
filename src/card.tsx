import { ReactNode } from 'react';
import { GroupExplainedParams } from './components/widgets/groupExplainedParams';
import { GroupExplainedHeaders } from './components/widgets/groupExplainedHeaders';
import { paramsApiResponseType } from './core/interfaces/api';
import { BadgePost } from './iconPost';

type badgeType = {
  method: string;
  router: string;
  title: string;
  headers: any;
  children: ReactNode;
  params: paramsApiResponseType[];
};

export const Card = ({ method, router, title, children, params, headers }: badgeType) => {
  const queryParams: paramsApiResponseType[] = params.filter((item: paramsApiResponseType) => item.in === 'query');
  const urlParams: paramsApiResponseType[] = params.filter((item: paramsApiResponseType) => item.in === 'param');

  return (
    <details className="text-gray-700 p-2">
      <summary className=" flex w-full cursor-pointer">
        <div className="flex items-center flex-1">
          <div>
            <BadgePost method={method} />
          </div>

          <span className=" font-black mx-2">{router}</span>

          <p className="flex-1"> {title}</p>
        </div>
      </summary>
      {children}

      <GroupExplainedParams params={queryParams} title="Query params" />

      <GroupExplainedParams params={urlParams} title="Path params" />

      <GroupExplainedHeaders headers={headers} />

      <div className=" border-b-4 bg-gray-300 my-4" />
    </details>
  );
};
