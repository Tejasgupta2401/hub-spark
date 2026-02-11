// Mock AI Code Analysis Engine
export const analyzeCode = (code, language = 'javascript') => {
  const bugs = [];
  const performance = [];
  const security = [];
  const suggestions = [];

  // Simple pattern matching for demo (replace with real AI)
  
  // Check for common issues
  if (code.includes('eval(')) {
    security.push('⚠️ Dangerous eval() usage detected - Security risk');
  }

  if (code.includes('console.log') && code.split('console.log').length > 5) {
    performance.push('💡 Too many console.logs - Consider using proper logging');
  }

  if (code.includes('function') && !code.includes('async') && code.includes('fetch')) {
    suggestions.push('✨ Consider using async/await for better readability');
  }

  if (!code.includes('try') && code.includes('catch')) {
    bugs.push('⚠️ Catch without try - Syntax issue');
  }

  if (code.includes('var ')) {
    suggestions.push('✨ Use const/let instead of var for better scoping');
  }

  // Calculate complexity
  const lines = code.split('\n').length;
  const complexity = lines < 20 ? 'Simple' : lines < 50 ? 'Medium' : 'Complex';

  // Generate test template
  const testTemplate = generateTestTemplate(language);

  return {
    bugs,
    performance,
    security,
    suggestions,
    complexity,
    testTemplate,
    metrics: {
      lines,
      cyclomatic_complexity: Math.floor(lines / 5),
      maintainability_index: 85,
      technical_debt: 'Low',
    },
  };
};

const generateTestTemplate = (language) => {
  const templates = {
    javascript: `import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('should return correct output', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });

  it('should handle edge cases', () => {
    const result = myFunction(edgeCase);
    expect(result).toBeDefined();
  });
});`,
    python: `import unittest

class TestMyFunction(unittest.TestCase):
    def test_return_correct_output(self):
        result = my_function(input)
        self.assertEqual(result, expected)

    def test_handle_edge_cases(self):
        result = my_function(edge_case)
        self.assertIsNotNone(result)`,
    java: `import org.junit.Test;
import static org.junit.Assert.*;

public class MyFunctionTest {
    @Test
    public void testReturnCorrectOutput() {
        assertEquals(expected, myFunction(input));
    }
}`,
  };

  return templates[language] || templates.javascript;
};

export const explainCode = (code) => {
  // Mock AI explanation
  return `This code snippet performs data processing and returns a transformed result. 
The function uses modern async/await syntax and includes proper error handling.
Time Complexity: O(n), Space Complexity: O(1)`;
};
