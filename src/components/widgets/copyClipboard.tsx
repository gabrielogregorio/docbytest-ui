import { useEffect, useState } from 'react';
import { IconCopyClipboard } from '../../icons';
import { copyToClipboard } from '../../core/helpers/clipboard';

type copyClipboardType = {
  dataToCopy: string | number | true | object;
};

export const CopyClipboard = ({ dataToCopy }: copyClipboardType) => {
  const [recentClickCopyItem, setRecentClickCopyItem] = useState<boolean>(false);

  useEffect(() => {
    let timeout;
    if (recentClickCopyItem) {
      timeout = setTimeout(() => {
        setRecentClickCopyItem(false);
      }, 900);
    }

    return () => clearTimeout(timeout);
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
