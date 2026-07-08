import type z from 'zod';

export const createZodIssue = (
  message: string,
  path: PropertyKey[],
): z.core.$ZodIssueCustom => ({
  code: 'custom',
  message,
  path,
});

export const zodIssueMessage = (
  error: z.core.$ZodIssue | string | undefined,
): string | undefined => {
  if (error === undefined) return undefined;
  return typeof error === 'string' ? error : error.message;
};
