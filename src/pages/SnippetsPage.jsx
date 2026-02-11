import React, { useState, useEffect } from 'react';
import { useCodeStore } from '../store/codeStore';
import { snippetService } from '../services/api';
import { Save, Trash2, Copy, Star } from 'lucide-react';

export const SnippetsPage = () => {
  const { snippets, setSnippets } = useCodeStore();
  const [newSnippet, setNewSnippet] = useState({ title: '', code: '', language: 'javascript', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      setLoading(true);
      const response = await snippetService.getAllSnippets();
      setSnippets(response.data);
    } catch (error) {
      console.error('Failed to load snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSnippet = async () => {
    if (!newSnippet.title || !newSnippet.code) {
      alert('Title and code are required');
      return;
    }

    try {
      await snippetService.createSnippet(newSnippet);
      setNewSnippet({ title: '', code: '', language: 'javascript', tags: [] });
      setTagInput('');
      loadSnippets();
    } catch (error) {
      alert('Failed to save snippet');
    }
  };

  const handleDeleteSnippet = async (id) => {
    if (!confirm('Delete this snippet?')) return;

    try {
      await snippetService.deleteSnippet(id);
      loadSnippets();
    } catch (error) {
      alert('Failed to delete snippet');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setNewSnippet({
        ...newSnippet,
        tags: [...newSnippet.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setNewSnippet({
      ...newSnippet,
      tags: newSnippet.tags.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Code Snippet Library</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Save New Snippet */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4">Save Snippet</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Snippet title"
                value={newSnippet.title}
                onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={newSnippet.language}
                onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>

              <textarea
                placeholder="Code snippet"
                value={newSnippet.code}
                onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Add
                </button>
              </div>

              {newSnippet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newSnippet.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(i)}
                        className="hover:text-blue-600"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={handleSaveSnippet}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
              >
                <Save className="w-4 h-4" />
                Save Snippet
              </button>
            </div>
          </div>
        </div>

        {/* Snippets List */}
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-center text-gray-500">Loading snippets...</p>
          ) : snippets.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No snippets saved yet</p>
          ) : (
            <div className="grid gap-4">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{snippet.title}</h4>
                      <p className="text-sm text-gray-500">{snippet.language}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {snippet.quality_score || '--'}%
                    </span>
                  </div>

                  {snippet.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {snippet.tags.split(',').map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{snippet.code}</p>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded transition text-sm">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={() => handleDeleteSnippet(snippet.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetsPage;
