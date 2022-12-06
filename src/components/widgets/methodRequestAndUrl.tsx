import { ReactElement, ReactNode } from 'react';
import { parametersExampleType } from '@/interfaces/api';
import { CopyClipboard } from './copyClipboard';

type MethodRequestAndUrlType = {
  type: string;
  name: string;
  value: parametersExampleType;
  label: string | ReactNode;
};

export const MethodRequestAndUrl = ({ type, name, value, label }: MethodRequestAndUrlType): ReactElement => {
  return (
    <div className="flex items-center dark:bg-[#282A36] my-2 bg-[#282A36] text-gray-700 overflow-x-auto">
      <label className="font-bold mr-3 flex w-full" htmlFor={name}>
        <span className="p-2 bg-gray-800 dark:text-gray-200 text-gray-200 flex items-center justify-center">
          {label}
        </span>
        <input
          type={type}
          name={name}
          value={value.toString()}
          disabled
          className="p-2 bg-transparent outline-none text-gray-200 flex-1"
        />
        <div className="flex items-center justify-center">
          <CopyClipboard dataToCopy={value.toString()} />
        </div>
      </label>
    </div>
  );
};
