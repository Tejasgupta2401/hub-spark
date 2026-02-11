import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const codeAnalysisService = {
  analyzeCode: (code, language) =>
    api.post('/analysis/analyze', { code, language }),
  getHistory: () => api.get('/analysis/history'),
  getAnalysis: (id) => api.get(`/analysis/${id}`),
};

export const snippetService = {
  getAllSnippets: () => api.get('/snippets'),
  createSnippet: (data) => api.post('/snippets', data),
  getSnippet: (id) => api.get(`/snippets/${id}`),
  updateSnippet: (id, data) => api.put(`/snippets/${id}`, data),
  deleteSnippet: (id) => api.delete(`/snippets/${id}`),
};
