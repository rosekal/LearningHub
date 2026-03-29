import type { Chapter, ContentBlock } from '@/content/schema';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const SHORT_ANSWER_SENTENCE_LIMIT = 3;

export interface ShortAnswerQuestion {
  id: string;
  prompt: string;
  answerGuidance: string;
  referenceAnswer: string;
  keyPoints: string[];
}

export interface ShortAnswerEvaluation {
  verdict: 'correct' | 'partially-correct' | 'incorrect';
  isCorrect: boolean;
  feedback: string;
  keyPointsCovered: string[];
  missingKeyPoints: string[];
}

interface GenerationRequest {
  apiKey: string;
  model: string;
  chapter: Chapter;
}

interface EvaluationRequest {
  apiKey: string;
  model: string;
  chapterContext: string;
  question: ShortAnswerQuestion;
  userAnswer: string;
}

interface ResponsesApiPayload {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
}

function serializeBlockText(block: ContentBlock) {
  if (block.type === 'paragraph') {
    return block.text;
  }

  if (block.type === 'bullet-list') {
    return block.items.join('\n');
  }

  if (block.type === 'figure') {
    return block.caption;
  }

  if (block.type === 'equation') {
    return [block.title, block.expression, block.explanation].filter(Boolean).join('\n');
  }

  if (block.type === 'table') {
    return [
      block.title,
      block.columns.join(' | '),
      ...block.rows.map((row) => row.join(' | ')),
      block.note,
    ]
      .filter(Boolean)
      .join('\n');
  }

  if (block.type === 'worked-example') {
    return [block.title, block.prompt, ...block.steps, block.takeaway].filter(Boolean).join('\n');
  }

  return [block.title, block.instructions, ...block.questions].filter(Boolean).join('\n');
}

function ensureSentenceLimitGuidance(guidance: string) {
  const normalized = guidance.trim();
  if (/three sentences|3 sentences|up to three sentences|maximum of three sentences/i.test(normalized)) {
    return normalized;
  }

  const trimmed = normalized.replace(/[.]+$/, '');
  return `${trimmed}. Keep the answer to no more than ${SHORT_ANSWER_SENTENCE_LIMIT} sentences.`;
}

export function buildChapterRawText(chapter: Chapter) {
  return chapter.blocks
    .map(serializeBlockText)
    .map((section) => section.trim())
    .filter(Boolean)
    .join('\n\n');
}

async function callStructuredOpenAI<T>({
  apiKey,
  model,
  name,
  schema,
  systemPrompt,
  userPrompt,
}: {
  apiKey: string;
  model: string;
  name: string;
  schema: Record<string, unknown>;
  systemPrompt: string;
  userPrompt: string;
}) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      store: false,
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: systemPrompt }],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: userPrompt }],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name,
          strict: true,
          schema,
        },
      },
    }),
  });

  const payload = (await response.json()) as ResponsesApiPayload;

  if (!response.ok) {
    throw new Error(payload.error?.message || 'OpenAI request failed.');
  }

  const outputText =
    payload.output_text ||
    payload.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === 'output_text' && typeof content.text === 'string')
      ?.text;

  if (!outputText) {
    throw new Error('OpenAI returned no structured output.');
  }

  return JSON.parse(outputText) as T;
}

export async function generateShortAnswerQuestions({
  apiKey,
  model,
  chapter,
}: GenerationRequest) {
  const chapterContext = buildChapterRawText(chapter);
  const payload = await callStructuredOpenAI<{
    questions: Array<{
      prompt: string;
      answerGuidance: string;
      referenceAnswer: string;
      keyPoints: string[];
    }>;
  }>({
    apiKey,
    model,
    name: 'learnhub_short_answer_quiz',
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        questions: {
          type: 'array',
          minItems: 5,
          maxItems: 5,
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              prompt: { type: 'string' },
              answerGuidance: { type: 'string' },
              referenceAnswer: { type: 'string' },
              keyPoints: {
                type: 'array',
                minItems: 2,
                maxItems: 5,
                items: { type: 'string' },
              },
            },
            required: ['prompt', 'answerGuidance', 'referenceAnswer', 'keyPoints'],
          },
        },
      },
      required: ['questions'],
    },
    systemPrompt:
      `You are an academic chemistry assessment author. Create rigorous but concise short-answer questions based only on the supplied chapter text. Do not rely on outside facts. Questions should test understanding of the chapter, not trivia. Every question must be answerable in no more than ${SHORT_ANSWER_SENTENCE_LIMIT} sentences. The answer guidance must explicitly tell the learner to stay within that limit in one short sentence. Reference answers must also stay within ${SHORT_ANSWER_SENTENCE_LIMIT} sentences.`,
    userPrompt: `Create exactly 5 short-answer questions for this chapter. The learner should be able to answer each one in at most ${SHORT_ANSWER_SENTENCE_LIMIT} sentences.\n\n${chapterContext}`,
  });

  return payload.questions.map((question, index) => ({
    id: `ai-short-answer-${index + 1}`,
    prompt: question.prompt,
    answerGuidance: ensureSentenceLimitGuidance(question.answerGuidance),
    referenceAnswer: question.referenceAnswer,
    keyPoints: question.keyPoints,
  }));
}

export async function evaluateShortAnswer({
  apiKey,
  model,
  chapterContext,
  question,
  userAnswer,
}: EvaluationRequest) {
  return callStructuredOpenAI<ShortAnswerEvaluation>({
    apiKey,
    model,
    name: 'learnhub_short_answer_evaluation',
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        verdict: {
          type: 'string',
          enum: ['correct', 'partially-correct', 'incorrect'],
        },
        isCorrect: {
          type: 'boolean',
        },
        feedback: {
          type: 'string',
        },
        keyPointsCovered: {
          type: 'array',
          items: { type: 'string' },
        },
        missingKeyPoints: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['verdict', 'isCorrect', 'feedback', 'keyPointsCovered', 'missingKeyPoints'],
    },
    systemPrompt:
      `You are grading a short-answer chemistry response. Judge the learner only against the supplied chapter text and the rubric. Mark isCorrect true only when the answer captures the main expected idea accurately enough for introductory chemistry study. The learner has been instructed to answer in no more than ${SHORT_ANSWER_SENTENCE_LIMIT} sentences. Treat that brevity limit as intentional. Do not lower the verdict or ask for extra elaboration simply because the answer is concise. Only mention missing detail when a key point is actually absent or inaccurate. Give concise, constructive feedback.`,
    userPrompt: [
      'Chapter text:',
      chapterContext,
      '',
      `Question: ${question.prompt}`,
      `Answer length rule: The learner answer is intentionally limited to ${SHORT_ANSWER_SENTENCE_LIMIT} sentences maximum.`,
      `Reference answer: ${question.referenceAnswer}`,
      `Key points: ${question.keyPoints.join('; ')}`,
      `Learner answer: ${userAnswer}`,
    ].join('\n'),
  });
}
