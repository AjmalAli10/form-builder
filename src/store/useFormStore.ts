import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Form, FormQuestion, QuestionType } from "../types/form";

interface FormStore {
  form: Form;
  drafts: Form[];
  builderState: {
    currentQuestionId: string | null;
    selectedTypes: QuestionType[];
    isDropdownOpen: boolean;
  };
  setTitle: (title: string) => void;
  addQuestion: (question: Partial<FormQuestion>) => void;
  removeQuestion: (questionId: string) => void;
  updateQuestion: (questionId: string, updates: Partial<FormQuestion>) => void;
  updateAnswer: (questionId: string, answer: string | number) => void;
  resetForm: () => void;
  setBuilderState: (state: Partial<FormStore["builderState"]>) => void;
  resetBuilderState: () => void;
  saveDraft: () => void;
  loadDraft: (draftId: string) => void;
  deleteDraft: (draftId: string) => void;
}

const initialForm: Form = {
  id: Date.now().toString(),
  title: "",
  questions: [],
  lastSequence: 0,
};

const initialBuilderState = {
  currentQuestionId: null,
  selectedTypes: [] as QuestionType[],
  isDropdownOpen: false,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      form: initialForm,
      drafts: [],
      builderState: initialBuilderState,

      setBuilderState: (newState) =>
        set((state) => ({
          builderState: { ...state.builderState, ...newState },
        })),

      resetBuilderState: () => set({ builderState: initialBuilderState }),

      setTitle: (title: string) =>
        set((state) => ({
          form: { ...state.form, title },
        })),

      addQuestion: (question: Partial<FormQuestion>) =>
        set((state) => {
          const newSequence = state.form.lastSequence + 1;
          const newQuestion: FormQuestion = {
            id: Date.now().toString(),
            type: "SHORT_ANSWER",
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

      updateAnswer: (questionId: string, answer: string | number) =>
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
    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        form: state.form,
        builderState: state.builderState,
        drafts: state.drafts,
      }),
    }
  )
);

if (typeof window !== "undefined") {
  useFormStore.persist.rehydrate();
}
