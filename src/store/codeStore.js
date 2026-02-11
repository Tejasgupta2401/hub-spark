import { create } from 'zustand';

export const useCodeStore = create((set) => ({
  code: '',
  language: 'javascript',
  analysis: null,
  snippets: [],
  selectedSnippet: null,
  isAnalyzing: false,

  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setAnalysis: (analysis) => set({ analysis }),
  setSnippets: (snippets) => set({ snippets }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

  reset: () => set({ code: '', analysis: null, language: 'javascript' }),
}));
