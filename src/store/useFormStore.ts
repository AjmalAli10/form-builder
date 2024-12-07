import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Form, FormQuestion, QuestionType } from "../types/form";

interface FormState {
  form: Form;
  selectedTypes: QuestionType[];
  drafts: Form[];
  questionInputs: Record<
    string,
    {
      questionText: string;
      options?: string[];
    }
  >;
  setTitle: (title: string) => void;
  addQuestion: (question: Partial<FormQuestion>) => void;
  removeQuestion: (questionId: string) => void;
  updateQuestion: (questionId: string, updates: Partial<FormQuestion>) => void;
  updateAnswer: (
    questionId: string,
    answer: string | number | string[]
  ) => void;
  resetForm: () => void;
  saveDraft: () => void;
  loadDraft: (draftId: string) => void;
  deleteDraft: (draftId: string) => void;
  reorderQuestions: (sourceIndex: number, destinationIndex: number) => void;
}

interface FormActions {
  addSelectedType: (type: QuestionType) => void;
  removeSelectedType: (type: QuestionType) => void;
  updateQuestionInput: (
    questionId: string,
    data: {
      questionText?: string;
      options?: string[];
    }
  ) => void;
  addOption: (questionId: string, option: string) => void;
  removeOption: (questionId: string, optionIndex: number) => void;
}

const initialForm: Form = {
  id: Date.now().toString(),
  title: "",
  questions: [],
  lastSequence: 0,
};

export const useFormStore = create<FormState & FormActions>()(
  persist(
    (set) => ({
      form: initialForm,
      drafts: [],
      selectedTypes: [],
      questionInputs: {},

      setTitle: (title: string) =>
        set((state) => ({
          form: { ...state.form, title },
        })),

      addQuestion: (question: Partial<FormQuestion>) =>
        set((state) => {
          const existingQuestion = state.form.questions.find(
            (q) => q.type === question.type
          );

          if (existingQuestion) {
            // Update the existing question's input value
            return {
              form: {
                ...state.form,
                questions: state.form.questions.map((q) =>
                  q.id === existingQuestion.id ? { ...q, ...question } : q
                ),
              },
            };
          }

          const newSequence = state.form.lastSequence + 1;
          const newQuestion: FormQuestion = {
            id: Date.now().toString(),
            type: question.type || "SHORT_ANSWER",
            question: "",
            sequence: newSequence,
            ...question,
          };

          return {
            form: {
              ...state.form,
              questions: [...state.form.questions, newQuestion],
              lastSequence: newSequence,
            },
          };
        }),

      removeQuestion: (questionId: string) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions
              .filter((q) => q.id !== questionId)
              .map((q, idx) => ({ ...q, sequence: idx + 1 })),
          },
        })),

      updateQuestion: (questionId: string, updates: Partial<FormQuestion>) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions.map((q) =>
              q.id === questionId ? { ...q, ...updates } : q
            ),
          },
        })),

      updateAnswer: (questionId: string, answer: string | number | string[]) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions.map((q) =>
              q.id === questionId ? { ...q, answer } : q
            ),
          },
        })),

      resetForm: () =>
        set({
          form: {
            ...initialForm,
            id: Date.now().toString(),
          },
        }),

      saveDraft: () =>
        set((state) => ({
          drafts: [
            ...(state.drafts || []),
            { ...state.form, id: Date.now().toString() },
          ],
        })),

      loadDraft: (draftId: string) =>
        set((state) => ({
          form: state.drafts.find((d) => d.id === draftId) || state.form,
        })),

      deleteDraft: (draftId: string) =>
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== draftId),
        })),

      addSelectedType: (type: QuestionType) =>
        set((state) => {
          const newSequence = state.form.questions.length + 1;
          const newQuestion: FormQuestion = {
            id: Date.now().toString(),
            type,
            question: "",
            sequence: newSequence,
          };

          return {
            selectedTypes: [...state.selectedTypes, type],
            form: {
              ...state.form,
              questions: [...state.form.questions, newQuestion],
              lastSequence: newSequence,
            },
          };
        }),

      removeSelectedType: (type: QuestionType) =>
        set((state) => {
          const updatedQuestions = state.form.questions
            .filter((q) => q.type !== type)
            .map((q, idx) => ({ ...q, sequence: idx + 1 }));

          return {
            selectedTypes: state.selectedTypes.filter((t) => t !== type),
            form: {
              ...state.form,
              questions: updatedQuestions,
              lastSequence: updatedQuestions.length,
            },
          };
        }),

      updateQuestionInput: (questionId, data) =>
        set((state) => ({
          questionInputs: {
            ...state.questionInputs,
            [questionId]: {
              ...state.questionInputs[questionId],
              ...data,
            },
          },
        })),

      addOption: (questionId: string, option: string) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions.map((q) =>
              q.id === questionId
                ? { ...q, options: [...(q.options || []), option] }
                : q
            ),
          },
        })),

      removeOption: (questionId: string, optionIndex: number) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions.map((q) =>
              q.id === questionId
                ? {
                    ...q,
                    options: q.options?.filter((_, idx) => idx !== optionIndex),
                  }
                : q
            ),
          },
        })),

      reorderQuestions: (sourceIndex: number, destinationIndex: number) =>
        set((state) => {
          const newSelectedTypes = Array.from(state.selectedTypes);
          const [removed] = newSelectedTypes.splice(sourceIndex, 1);
          newSelectedTypes.splice(destinationIndex, 0, removed);

          const newQuestions = Array.from(state.form.questions);
          const [removedQuestion] = newQuestions.splice(sourceIndex, 1);
          newQuestions.splice(destinationIndex, 0, removedQuestion);

          // Update sequence numbers for all questions
          const updatedQuestions = newQuestions.map((q, idx) => ({
            ...q,
            sequence: idx + 1,
          }));

          return {
            selectedTypes: newSelectedTypes,
            form: {
              ...state.form,
              questions: updatedQuestions,
              lastSequence: updatedQuestions.length,
            },
          };
        }),
    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        form: state.form,
        drafts: state.drafts,
        selectedTypes: state.selectedTypes,
        questionInputs: state.questionInputs,
      }),
    }
  )
);

if (typeof window !== "undefined") {
  useFormStore.persist.rehydrate();
}
