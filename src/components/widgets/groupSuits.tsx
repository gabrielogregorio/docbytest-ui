import { apiResponseFileTypes } from '../../core/interfaces/api';
import { GroupCases } from './groupCases';

export const GroupSuits = ({ files }: { files: apiResponseFileTypes[] }) => {
  function renderSuits() {
    return files.map((file: apiResponseFileTypes) => {
      return (
        <div className="border flex flex-col p-6">
          <div className="flex justify-center">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-600">{file.title}</h2>
              <p className="text-sm text-gray-600">{file.description}</p>
            </div>
          </div>

          <GroupCases paths={file.paths} />
        </div>
      );
    });
  }

  return <>{renderSuits()}</>;
};
