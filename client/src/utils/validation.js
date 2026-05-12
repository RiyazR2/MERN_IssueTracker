import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title cannot be more than 255 characters'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assignedTo: z.string().optional().nullable(),
});

export const updateIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title cannot be more than 255 characters')
    .optional(),
  description: z.string().min(1, 'Description is required').optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assignedTo: z.string().optional().nullable(),
});
