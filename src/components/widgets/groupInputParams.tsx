import { paramsApiResponseType } from '../../core/interfaces/api';

export const GroupInputParams = ({ params, title }: { params: paramsApiResponseType[]; title: string }) => {
  if (params.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-bold text-gray-500 mr-3 mb-2">{title}</h3>
      {params.map((item) => {
        return (
          <div className="flex items-center border border-gray-300 bg-gray-200 my-2 p-2 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">{item.variable}</h4>
            <input
              type={item.type}
              name="auth"
              id="auth"
              value={item.example}
              className="bg-transparent outline-none text-gray-700"
            />
          </div>
        );
      })}
    </div>
  );
};
