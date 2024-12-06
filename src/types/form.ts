export type QuestionType =
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "SINGLE_SELECT"
  | "NUMBER"
  | "URL";

export interface FormQuestion {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  options?: string[];
  required?: boolean;
  answer?: string | number;
  sequence: number;
}

export interface Form {
  id: string;
  title: string;
  questions: FormQuestion[];
  completionPercentage?: number;
  lastSequence: number;
}
