import { ReactNode } from 'react';

type Illustration = {
  title: ReactNode;
  subtitle: ReactNode;
  imageSrc: string;
  imageAlt: string;
  referenceHref?: string;
  referenceText?: string;
};

export const Illustration = ({ title, subtitle, imageSrc, imageAlt, referenceHref, referenceText }: Illustration) => {
  return (
    <div
      style={{ minHeight: 'calc(100vh - 3.5rem)' }}
      className="w-full dark:bg-dark flex items-center justify-center flex-col">
      <h1 className="dark:text-white text-dark text-4xl text-center">{title}</h1>
      <h2 className="dark:text-white text-dark text-xl text-center pt-2">{subtitle}</h2>
      <div className="w-full flex justify-center">
        <img className="w-96 object-cover" src={imageSrc} alt={imageAlt} />
      </div>

      {referenceHref ? (
        <div className="dark:text-white text-dark text-base text-center">
          <a className="underline" href={referenceHref} target="_blank" rel="noreferrer">
            {referenceText}
          </a>
        </div>
      ) : null}
    </div>
  );
};

Illustration.defaultProps = {
  referenceHref: '',
  referenceText: '',
};
