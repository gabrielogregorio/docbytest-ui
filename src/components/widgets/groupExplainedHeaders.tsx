export const GroupExplainedHeaders = ({ headers }: { headers: any }) => {
  const headersKey = Object.keys(headers);

  if (headersKey.length === 0) {
    return null;
  }
  return (
    <div>
      <h3 className="uppercase mb-2 font-semibold text-gray-500">Headers</h3>
      <div className="rounded-md border-2">
        {headersKey.map((headerKey: any) => {
          return (
            <div className="bg-gray-100 p-3">
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
