"use client";
import { useState, useEffect } from "react";
import { useFormStore } from '@/store/useFormStore';
import { QuestionBuilder } from "./QuestionBuilder";
import { FormHeader } from "./FormHeader";
import { QuestionType, FormQuestion } from "@/types/form";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

export default function FormBuilder() {
  const form = useFormStore((state) => state.form);
  const addSelectedType = useFormStore((state) => state.addSelectedType);
  const removeSelectedType = useFormStore((state) => state.removeSelectedType);
  const reorderQuestions = useFormStore((state) => state.reorderQuestions);
  const updateQuestion = useFormStore((state) => state.updateQuestion);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const saveDraft = useFormStore((state) => state.saveDraft);
  const loadDraft = useFormStore((state) => state.loadDraft);
  const drafts = useFormStore((state) => state.drafts);
  const [showDrafts, setShowDrafts] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex !== destinationIndex) {
      reorderQuestions(sourceIndex, destinationIndex);
    }
  };

  const handleTypeSelect = (type: QuestionType) => {
    addSelectedType(type);
    setIsDropdownOpen(false);
  };

  const handleCancel = (type: QuestionType) => {
    removeSelectedType(type);
  };

  const handleQuestionChange = (questionId: string, updates: Partial<FormQuestion>) => {
    updateQuestion(questionId, updates);
  };

  const handlePublish = async () => {
    try {
      router.push('/preview');
    } catch (error) {
      console.error('Error publishing form:', error);
    }
  };

  const handleSaveAsDraft = () => {
    saveDraft();
    toast.success('Form saved as draft');
  };

  const getTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'SHORT_ANSWER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case 'LONG_ANSWER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        );
      case 'SINGLE_SELECT':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case 'NUMBER':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
      case 'URL':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  if (!enabled) {
    return null;
  }

  const sortedQuestions = [...form.questions].sort((a, b) => a.sequence - b.sequence);

  return (

      <>
        <FormHeader />
        
        <div className="p-6 pb-[80px]">
          {/* Question list */}
          <div className="flex flex-col gap-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <StrictModeDroppable droppableId="questions" direction="vertical">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
                    {sortedQuestions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <QuestionBuilder
                              type={question.type}
                              onTypeChange={(newType) => handleQuestionChange(question.id, { ...question, type: newType })}
                              onCancel={() => handleCancel(question.type)}
                              dragHandleProps={provided.dragHandleProps || undefined}
                              question={question}
                              onQuestionChange={(updates) => handleQuestionChange(question.id, updates)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          </div>

          {/* Add question button */}
          <div className="flex justify-center mt-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-[32px] px-[16px] py-[6px] pl-[14px] gap-1 rounded-xl bg-white border border-[#E1E4E8] shadow-[0px_3px_3px_-1.5px_#00000008,0px_1px_1px_-0.5px_#00000008] flex items-center font-inter text-[14px] font-semibold leading-5 text-center text-[#0D0D0D] underline-offset-[from-font] decoration-skip-ink-none"
              >
                <svg className="w-4 h-4 text-[#0D0D0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Question
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-[#E1E4E8] z-50">
                  <div className="p-2">
                    <div className="space-y-1">
                      {['SHORT_ANSWER', 'LONG_ANSWER', 'SINGLE_SELECT', 'NUMBER', 'URL'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            handleTypeSelect(type as QuestionType);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                        >
                          {getTypeIcon(type as QuestionType)}
                          {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save and Publish buttons */}
        <div className="absolute bottom-0 left-0 right-0 h-[64px] px-6 py-4 flex justify-between items-center border-t border-[#E1E4E8] bg-[#F6F8FAE5] backdrop-blur-[4px]">
          <div className="relative">
            <button 
              onClick={handleSaveAsDraft}
              disabled={form.questions.length === 0}
              className="h-8 px-4 py-1.5 rounded-xl flex items-center gap-1 bg-white border border-[#E1E4E8] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Save as Draft</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDrafts && drafts.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border">
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Saved Drafts</h3>
                  <div className="space-y-1">
                    {drafts.map((draft) => (
                      <button
                        key={draft.id}
                        onClick={() => {
                          loadDraft(draft.id);
                          setShowDrafts(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {draft.title || 'Untitled Form'} - {new Date(Number(draft.id)).toLocaleDateString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 font-inter text-[14px] font-semibold leading-5 text-center underline-offset-[from-font] decoration-skip-ink-none ${
              form.questions.length === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#0D0D0D] hover:bg-gray-100'
            }`}
            onClick={handlePublish}
            disabled={form.questions.length === 0}
          >
            <span className="flex items-center gap-2">
              Preview
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </button>
        </div>
    </>
  );
}
