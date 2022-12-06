import { ReactElement, useEffect, useState } from 'react';
import { copyToClipboard } from '@/helpers/clipboard';
import { IconCopyClipboard } from '@/icons/index';

type copyClipboardType = {
  dataToCopy: string;
};

export const CopyClipboard = ({ dataToCopy }: copyClipboardType): ReactElement => {
  const [recentClickCopyItem, setRecentClickCopyItem] = useState<boolean>(false);

  useEffect(() => {
    const TIME_IN_MS_TO_HIDDEN_COPY: number = 900;
    let idTimeout: number;
    if (recentClickCopyItem) {
      // @ts-ignore
      idTimeout = setTimeout(() => {
        setRecentClickCopyItem(false);
      }, TIME_IN_MS_TO_HIDDEN_COPY);
    }

    return () => clearTimeout(idTimeout);
  }, [recentClickCopyItem]);

  return (
    <button
      type="button"
      onClick={(): void => {
        copyToClipboard(dataToCopy);
        setRecentClickCopyItem(true);
      }}
      className={`text-white ${recentClickCopyItem ? 'animation duration-500 scale-150 opacity-0' : ''}`}>
      <IconCopyClipboard />
    </button>
  );
};
