import { useEffect, useState } from 'react';
import { copyToClipboard } from '../../core/helpers/clipboard';

type copyClipboardType = {
  dataToCopy: string;
};

export const CopyClipboard = ({ dataToCopy }: copyClipboardType) => {
  const [recentClickCopyItem, setRecentClickCopyItem] = useState<boolean>(false);

  useEffect(() => {
    if (recentClickCopyItem) {
      setTimeout(() => {
        setRecentClickCopyItem(false);
      }, 900);
    }

    return () => clearTimeout();
  }, [recentClickCopyItem]);

  return (
    <button
      type="button"
      onClick={() => {
        copyToClipboard(dataToCopy);
        setRecentClickCopyItem(true);
      }}
      className={`text-white ${recentClickCopyItem ? 'animation duration-500 scale-150 opacity-0' : ''}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </button>
  );
};