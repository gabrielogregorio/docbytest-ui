export const GroupInputHeaders = ({ headers }: { headers: any }) => {
  return (
    <div>
      <h3 className="font-bold text-gray-500 mr-3 mb-2">Headers</h3>

      {Object.keys(headers).map((keyRunner) => {
        return (
          <div className="flex items-center border border-gray-300 bg-gray-200 my-2 p-2 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">{keyRunner}</h4>
            <input
              type="text"
              name="auth"
              id="auth"
              value={headers?.[keyRunner]?.toString()}
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>
        );
      })}
    </div>
  );
};
