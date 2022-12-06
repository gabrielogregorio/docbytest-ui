import { ReactElement } from 'react';
import { paramsType } from '@/interfaces/api';
import { MethodRequestAndUrl } from './methodRequestAndUrl';

export const GroupMethodRequestAndUrls = ({ params, title }: { params: paramsType[]; title: string }): ReactElement => {
  if (params.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">{title}</h3>
      {params.map((item: paramsType) => {
        return <MethodRequestAndUrl label={item.variable} name="auth" type={item.type} value={item.example} />;
      })}
    </div>
  );
};
