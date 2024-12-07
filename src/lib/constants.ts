import { SingleSelect } from "../components/questions/SingleSelect";
import { ShortAnswer } from "../components/questions/ShortAnswer";
import { LongAnswer } from "../components/questions/LongAnswer";
import { Number } from "../components/questions/Number";
import { URL } from "../components/questions/URL";

export const QUESTION_TYPES = {
  SINGLE_SELECT: {
    component: SingleSelect,
    isCustom: true,
    type: "single-select",
  },
  LONG_ANSWER: {
    component: LongAnswer,
    isCustom: true,
    type: "other",
  },
  SHORT_ANSWER: {
    component: ShortAnswer,
    type: "text",
    placeholder: "Short answer text",
  },
  NUMBER: {
    component: Number,
    type: "number",
    placeholder: "Number input",
  },
  URL: {
    component: URL,
    type: "url",
    placeholder: "URL input",
  },
} as const;

export const INPUT_TYPE_HEADER = {
  className: "h-9 px-4 py-2 flex items-center bg-[#FAFBFC] border-b",
  text: "Input Types",
  textClassName: "text-xs font-medium text-[#6E7781] uppercase",
} as const;

export const DROPDOWN_STYLES = {
  container:
    "absolute mt-2 w-64 bg-white rounded-md shadow-lg border border-[#E1E4E8] z-50",
  content: "p-2",
  button:
    "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2",
  iconWrapper: "text-gray-600",
} as const;
