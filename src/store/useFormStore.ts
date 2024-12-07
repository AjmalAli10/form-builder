import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Form, FormQuestion, QuestionType } from "../types/form";

interface FormState {
  form: Form;
  selectedTypes: QuestionType[];
  drafts: Form[];
  setTitle: (title: string) => void;
  addSelectedType: (type: QuestionType) => void;
  removeSelectedType: (type: QuestionType) => void;
  updateQuestion: (id: string, updates: Partial<FormQuestion>) => void;
  removeQuestion: (id: string) => void;
  reorderQuestions: (sourceIndex: number, destinationIndex: number) => void;
  saveDraft: () => void;
  loadDraft: (draftId: string) => void;
  updateAnswer: (
    questionId: string,
    answer: string | number | string[]
  ) => void;
}

const initialForm: Form = {
  id: Date.now().toString(),
  title: "",
  questions: [],
  lastSequence: 0,
};

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      form: initialForm,
      selectedTypes: [],
      drafts: [],

      setTitle: (title) =>
        set((state) => ({
          form: { ...state.form, title },
        })),

      addSelectedType: (type) =>
        set((state) => {
          const newSequence = state.form.lastSequence + 1;
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

      removeSelectedType: (type) =>
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

      updateQuestion: (id, updates) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions.map((q) =>
              q.id === id ? { ...q, ...updates } : q
            ),
          },
        })),

      removeQuestion: (id) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions
              .filter((q) => q.id !== id)
              .map((q, idx) => ({ ...q, sequence: idx + 1 })),
          },
        })),

      reorderQuestions: (sourceIndex, destinationIndex) =>
        set((state) => {
          const newSelectedTypes = Array.from(state.selectedTypes);
          const [removed] = newSelectedTypes.splice(sourceIndex, 1);
          newSelectedTypes.splice(destinationIndex, 0, removed);

          const newQuestions = Array.from(state.form.questions);
          const [removedQuestion] = newQuestions.splice(sourceIndex, 1);
          newQuestions.splice(destinationIndex, 0, removedQuestion);

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

      saveDraft: () =>
        set((state) => ({
          drafts: [
            ...state.drafts,
            { ...state.form, id: Date.now().toString() },
          ],
        })),

      loadDraft: (draftId) =>
        set((state) => ({
          form: state.drafts.find((d) => d.id === draftId) || state.form,
        })),

      updateAnswer: (questionId, answer) =>
        set((state) => ({
          form: {
            ...state.form,
            questions: state.form.questions.map((q) =>
              q.id === questionId ? { ...q, answer } : q
            ),
          },
        })),
    }),
    {
      name: "form-storage",
    }
  )
);
