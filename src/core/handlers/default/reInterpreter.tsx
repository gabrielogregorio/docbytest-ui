import { regexInterpreterType } from '../../interfaces/interpreter';

export const reInterpreterDefault: regexInterpreterType = {
  isParagraph: /^(.{1,})\n/,
  isComment: /^\s*>\s*(\w*|)\s*#\s*(.*?)\n\s*>\s*(.*?)\n/,
  isTable: /^(\\|.+\|)\n[\\|\-\s]+\n((\|.+\|\n)*)\n/,
  isCompleteList: /^\s*\*\s*(.*)(\n\s*\*\s*.*)*\n/,
  isSpecialTable: /^\s*\[(.+?)\]\(([\w_]+)\)\s*\n/,
  isCode: /^\s*```\s*([\w]*)\s*\n([^`]*)```\s*\n/,
  isTitleH1: /^\s*#\s+(.*)\s*\n/,
  isTitleH2: /^\s*##\s+(.*)\s*\n/,
  isTitleH3: /^\s*###\s+(.*)\s*\n/,
  isTitleH4: /^\s*####\s+(.*)\s*\n/,
  isTitleH5: /^\s*#####\s+(.*)\s*\n/,
  isTitleH6: /^\s*######\s+(.*)\s*\n/,
};
