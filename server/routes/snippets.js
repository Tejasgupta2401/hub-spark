import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { runAsync, allAsync, getAsync } from '../db/init.js';

export const snippetRouter = express.Router();

// Get all snippets
snippetRouter.get('/', async (req, res) => {
  try {
    const snippets = await allAsync(
      `SELECT id, title, language, tags, quality_score, created_at FROM snippets ORDER BY created_at DESC`
    );
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create snippet
snippetRouter.post('/', async (req, res) => {
  try {
    const { title, code, language, tags } = req.body;
    const id = uuidv4();

    await runAsync(
      `INSERT INTO snippets (id, title, code, language, tags) VALUES (?, ?, ?, ?, ?)`,
      [id, title || 'Untitled', code, language, tags?.join(',')]
    );

    res.json({ id, message: 'Snippet created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get snippet by ID
snippetRouter.get('/:id', async (req, res) => {
  try {
    const snippet = await getAsync(`SELECT * FROM snippets WHERE id = ?`, [req.params.id]);
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update snippet
snippetRouter.put('/:id', async (req, res) => {
  try {
    const { title, code, language, tags, quality_score } = req.body;

    await runAsync(
      `UPDATE snippets SET title = ?, code = ?, language = ?, tags = ?, quality_score = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [title, code, language, tags?.join(','), quality_score, req.params.id]
    );

    res.json({ message: 'Snippet updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete snippet
snippetRouter.delete('/:id', async (req, res) => {
  try {
    await runAsync(`DELETE FROM snippets WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Snippet deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
