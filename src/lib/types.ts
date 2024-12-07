import { QuestionType } from "@/types/form";
import { type ComponentType } from "react";

export interface BaseQuestionProps {
  isPreview?: boolean;
}

export interface SingleSelectQuestionProps extends BaseQuestionProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

export interface BaseQuestionType<
  T extends BaseQuestionProps = BaseQuestionProps
> {
  component: ComponentType<T>;
}

export interface SingleSelectType
  extends BaseQuestionType<SingleSelectQuestionProps> {
  isCustom: true;
  type: "single-select";
}

export interface OtherCustomType extends BaseQuestionType<BaseQuestionProps> {
  isCustom: true;
  type: "other";
}

export interface StandardQuestionType
  extends BaseQuestionType<BaseQuestionProps> {
  type: "text" | "number" | "url";
  placeholder: string;
}

export type QuestionVariant =
  | "SINGLE_SELECT"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "NUMBER"
  | "URL";

export type QuestionTypeConfig = Record<
  QuestionVariant,
  SingleSelectType | OtherCustomType | StandardQuestionType
>;

export interface InputTypeDropdownProps {
  onSelect: (type: QuestionType) => void;
  isOpen: boolean;
  className?: string;
  showHeader?: boolean;
}
