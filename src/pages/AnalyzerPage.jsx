import React, { useState, useEffect } from 'react';
import { useCodeStore } from '../store/codeStore';
import { codeAnalysisService } from '../services/api';
import CodeEditor from '../components/CodeEditor';
import AnalysisCard, { TestTemplateCard } from '../components/AnalysisCard';
import { Zap, AlertCircle } from 'lucide-react';

export const AnalyzerPage = () => {
  const { code, language, analysis, isAnalyzing, setCode, setLanguage, setAnalysis, setIsAnalyzing } = useCodeStore();
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please paste some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await codeAnalysisService.analyzeCode(code, language);
      setAnalysis(response.data);
    } catch (err) {
      setError('Analysis failed: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Code Analyzer</h2>
        <p className="text-gray-600">Paste your code and get instant AI-powered analysis, bugs detection, and optimization suggestions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Code Editor */}
        <div>
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
          />

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !code.trim()}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 transition"
          >
            <Zap className="w-5 h-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Right: Analysis Results */}
        <div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            {analysis ? (
              <div className="space-y-6">
                <AnalysisCard analysis={analysis} />
                {analysis.testTemplate && (
                  <TestTemplateCard testTemplate={analysis.testTemplate} language={language} />
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Submit code to see analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzerPage;
