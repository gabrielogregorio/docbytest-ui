import { regexInterpreterType } from '../interfaces/interpreter';

export const reInterpreterDefault: regexInterpreterType = {
  isParagraph: /^(.{1,1000})\n/,
  isComment: /^\s{0,10}(>\s{0,10}\w*|)\s{0,10}#\s*(.*?\n)((\s{0,20}>\s{0,20}.*\n){1,})\n/,
  isTable: /^(\\|.+\|)\n[\\|\-\s]+\n((\|.+\|\n)*)\n/,
  isCompleteList: /^\s{0,10}[\\*•]\s{1,10}(.{1,1000})(\n\s{0,10}[\\*•]\s{1,10}.{1,1000})*\n/,
  isSpecialTable: /^\s{0,10}\[(.+?)\]\(([\w_]+)\)\s{0,10}\n/,
  isCode: /^\s{0,10}```\s{0,10}([\w]*)\s{0,10}\n([^`]{1,1000})```\s{0,10}\n/,
  isHr: /^\s{0,10}(-{3,300})\s{0,10}\n/,
  isImage: /^\s{0,10}!\[(.*?)\]\((.*?)\)\s{0,10}\n/,
  isTitleH1: /^\s{0,10}#\s+(.{1,1000})\s{0,10}\n/,
  isTitleH2: /^\s{0,10}##\s+(.{1,1000})\s{0,10}\n/,
  isTitleH3: /^\s{0,10}###\s+(.{1,1000})\s{0,10}\n/,
  isTitleH4: /^\s{0,10}####\s+(.{1,1000})\s{0,10}\n/,
  isTitleH5: /^\s{0,10}#####\s+(.{1,1000})\s{0,10}\n/,
  isTitleH6: /^\s{0,10}######\s+(.{1,1000})\s{0,10}\n/,
};
