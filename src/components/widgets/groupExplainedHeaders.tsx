import { ReactNode } from 'react';

export const GroupExplainedHeaders = ({ headers }: { headers: ReactNode }) => {
  const headersKey = Object.keys(headers);

  if (headersKey.length === 0) {
    return null;
  }
  return (
    <div>
      <h3 className="uppercase mb-2 font-semibold text-gray-500">Headers</h3>
      <div className="rounded-md border-2">
        {headersKey.map((headerKey: string) => {
          return (
            <div className="bg-white p-3" key={headerKey}>
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
