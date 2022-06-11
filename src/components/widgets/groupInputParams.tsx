import { paramsType } from '../../core/interfaces/api';
import { InputParam } from './inputParam';

export const GroupInputParams = ({ params, title }: { params: paramsType[]; title: string }) => {
  if (params.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-bold dark:text-gray-200 text-gray-600 mr-3 mb-2">{title}</h3>
      {params.map((item) => {
        return <InputParam label={item.variable} name="auth" type={item.type} value={item.example} />;
      })}
    </div>
  );
};
