import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';

export const AnalysisCard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      {/* Bugs */}
      {analysis.bugs?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-red-900">Issues Found</h3>
          </div>
          <ul className="space-y-2">
            {analysis.bugs.map((bug, i) => (
              <li key={i} className="text-sm text-red-800">{bug}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Security */}
      {analysis.security?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Security Warnings</h3>
          </div>
          <ul className="space-y-2">
            {analysis.security.map((issue, i) => (
              <li key={i} className="text-sm text-yellow-800">{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Performance */}
      {analysis.performance?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-blue-900">Performance Tips</h3>
          </div>
          <ul className="space-y-2">
            {analysis.performance.map((tip, i) => (
              <li key={i} className="text-sm text-blue-800">{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions?.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-green-900">Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {analysis.suggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-green-800">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Complexity */}
      {analysis.metrics && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-purple-900">Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-purple-800">
            <p>Lines: {analysis.metrics.lines}</p>
            <p>Complexity: {analysis.complexity}</p>
            <p>Maintainability: {analysis.metrics.maintainability_index}%</p>
            <p>Tech Debt: {analysis.metrics.technical_debt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const TestTemplateCard = ({ testTemplate, language }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">Test Template ({language})</h3>
      <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
        <code>{testTemplate}</code>
      </pre>
    </div>
  );
};

export default AnalysisCard;
