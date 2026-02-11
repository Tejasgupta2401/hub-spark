import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runAsync, getAsync } from '../db/init.js';
import { analyzeCode } from '../utils/codeAnalyzer.js';

export const codeAnalysisRouter = express.Router();

// Analyze code
codeAnalysisRouter.post('/analyze', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Mock AI Analysis (replace with real API calls)
    const analysis = analyzeCode(code, language);

    const snippetId = uuidv4();
    const analysisId = uuidv4();

    // Save snippet
    await runAsync(
      `INSERT INTO snippets (id, code, language) VALUES (?, ?, ?)`,
      [snippetId, code, language || 'javascript']
    );

    // Save analysis
    await runAsync(
      `INSERT INTO analyses (id, snippet_id, bugs, performance_issues, security_issues, suggestions, test_template, complexity_analysis)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        analysisId,
        snippetId,
        JSON.stringify(analysis.bugs),
        JSON.stringify(analysis.performance),
        JSON.stringify(analysis.security),
        JSON.stringify(analysis.suggestions),
        analysis.testTemplate,
        analysis.complexity,
      ]
    );

    res.json({
      snippetId,
      analysisId,
      ...analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analysis history
codeAnalysisRouter.get('/history', async (req, res) => {
  try {
    const snippets = await require('../db/init.js').allAsync(
      `SELECT * FROM snippets ORDER BY created_at DESC LIMIT 20`
    );
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific analysis
codeAnalysisRouter.get('/:analysisId', async (req, res) => {
  try {
    const analysis = await getAsync(
      `SELECT * FROM analyses WHERE id = ?`,
      [req.params.analysisId]
    );
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
