import { useEffect, useState } from 'react';
import { IconCopyClipboard } from '../../icons';
import { copyToClipboard } from '../../core/helpers/clipboard';

type copyClipboardType = {
  dataToCopy: string;
};

export const CopyClipboard = ({ dataToCopy }: copyClipboardType) => {
  const [recentClickCopyItem, setRecentClickCopyItem] = useState<boolean>(false);

  useEffect(() => {
    let id: any;
    if (recentClickCopyItem) {
      id = setTimeout(() => {
        setRecentClickCopyItem(false);
      }, 900);
    }

    return () => clearTimeout(id);
  }, [recentClickCopyItem]);

  return (
    <button
      type="button"
      onClick={() => {
        copyToClipboard(dataToCopy);
        setRecentClickCopyItem(true);
      }}
      className={`text-white ${recentClickCopyItem ? 'animation duration-500 scale-150 opacity-0' : ''}`}>
      <IconCopyClipboard />
    </button>
  );
};
