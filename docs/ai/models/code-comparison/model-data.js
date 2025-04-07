// Model pricing data
const pricingData = {
  'Claude 3.5 Sonnet': { input: 3.00, output: 15.00, blended: 6.00, credits: 1.0 },
  'GPT-4o': { input: 5.00, output: 15.00, blended: 7.50, credits: 1.0 },
  'Claude 3.7 Sonnet': { input: 3.00, output: 15.00, blended: 6.00, credits: 1.0 },
  'Claude 3.7 Sonnet (Thinking)': { input: 3.00, output: 15.00, blended: 6.00, credits: 1.25 },
  'Gemini 2.5 Pro': { input: 1.60, output: 6.40, blended: 2.80, credits: 1.0 },
  'DeepSeek V3 (0324)': { input: 0.14, output: 0.28, blended: 0.17, credits: 0 },
  'DeepSeek R1': { input: 0.14, output: 0.28, blended: 0.17, credits: 0.5 },
  'o3-mini': { input: 0.50, output: 1.50, blended: 0.75, credits: 1.0 },
  'Gemini 2.0 Flash': { input: 0.10, output: 0.30, blended: 0.15, credits: 0.25 },
  'DeepSeek Coder V2': { input: 0.14, output: 0.28, blended: 0.17, credits: 0.5 },
  'Qwen 2.5 Coder 7B': { input: 0.01, output: 0.09, blended: 0.03, credits: null },
  'Qwen 2.5 Coder 32B': { input: 0.20, output: 0.80, blended: 0.35, credits: null },
  'Codestral 22B': { input: 0.30, output: 0.90, blended: 0.45, credits: null },
  'Llama 3 Coder': { input: 0.15, output: 0.45, blended: 0.23, credits: null },
};

// Category labels and descriptions
const categoryLabels = {
  'code-completion': 'Code Completion',
  'code-generation': 'Code Generation',
  'test-creation': 'Test Creation & Testing',
  'debugging': 'Debugging & Problem Solving',
  'refactoring': 'Code Refactoring & Optimization',
  'documentation': 'Documentation Generation',
  'architecture': 'System Architecture & Planning',
  'practical-implementation': 'Practical Implementation (LiveCodeBench)',
};

const categoryExplanations = {
  'code-completion': 'Filling in partial code the user has already started. Usually measured by benchmarks like HumanEval where the model completes functions.',
  'code-generation': 'Creating entire code blocks from natural language descriptions. Evaluates ability to transform requirements into working code.',
  'test-creation': 'Creating unit tests, integration tests, and test suites for code. Evaluates the model\'s ability to understand code functionality and create tests with good coverage.',
  'debugging': 'Finding and fixing errors in code. Tests the model\'s ability to understand existing code and identify problems.',
  'refactoring': 'Restructuring code without changing behavior, to improve readability, performance, or maintainability.',
  'documentation': 'Creating clear documentation for code. Tests the model\'s ability to explain code functionality.',
  'architecture': 'Designing high-level system architecture and planning complex implementations across multiple files.',
  'practical-implementation': 'Performance on real-world coding challenges like LiveCodeBench that simulate practical development tasks and holistic coding ability.',
};