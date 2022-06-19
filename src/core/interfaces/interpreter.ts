import { ReactNode } from 'react';

export type regexInterpreterType = {
  isParagraph: RegExp;
  isComment: RegExp;
  isTable: RegExp;
  isCompleteList: RegExp;
  isSpecialTable: RegExp;
  isCode: RegExp;
  isHr: RegExp;
  isImage: RegExp;
  isTitleH1: RegExp;
  isTitleH2: RegExp;
  isTitleH3: RegExp;
  isTitleH4: RegExp;
  isTitleH5: RegExp;
  isTitleH6: RegExp;
};

export type renderHandlerMarkdownType = {
  base: (children: ReactNode) => ReactNode;
  h1: (content: string) => ReactNode;
  h2: (content: string) => ReactNode;
  h3: (content: string) => ReactNode;
  h4: (content: string) => ReactNode;
  h5: (content: string) => ReactNode;
  h6: (content: string) => ReactNode;
  code: (language: string, code: string) => ReactNode;
  hr: () => ReactNode;
  image: (description: string, link: string) => ReactNode;
  specialTable: (key: string, value: string) => ReactNode;
  list: (completeList: string) => ReactNode;
  table: (tbody: string, thead: string) => ReactNode;
  comment: (color: string, title: string, text: string) => ReactNode;
  paragraph: (paragraph: string) => ReactNode;
};
