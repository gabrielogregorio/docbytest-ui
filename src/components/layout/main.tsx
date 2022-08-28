import { ReactNode } from 'react';

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative z-10 col-span-12 lg:col-span-9 flex flex-col max-h-screen">
      <div
        className="overflow-y-auto"
        style={{
          height: 'calc(100vh - 3.5rem)',
        }}>
        {children}
      </div>
    </main>
  );
};
