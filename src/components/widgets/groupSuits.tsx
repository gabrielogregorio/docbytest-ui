/* eslint-disable react/no-children-prop */
import { apiResponseFileTypes } from '../../core/interfaces/api';
import { SidebarBaseMenu } from '../sidebarBaseMenu';
import { GroupCases } from './groupCases';

export const GroupSuits = ({ files, filter }: { files: apiResponseFileTypes[]; filter: string }) => {
  function renderSuits() {
    return files.map((file: apiResponseFileTypes) => {
      return (
        <SidebarBaseMenu title={file.title}>
          <GroupCases filter={filter} paths={file.paths} title={file.title} description={file.description} />
        </SidebarBaseMenu>
      );
    });
  }

  return <>{renderSuits()}</>;
};
