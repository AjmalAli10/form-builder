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
