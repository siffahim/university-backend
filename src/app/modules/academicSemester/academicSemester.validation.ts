import { z } from 'zod';
import { AcademicSemesterMonths } from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required'
    }),
    year: z.number({ required_error: 'Year is required' }),
    code: z.enum(['01', '02', '03'], { required_error: 'Code is required' }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required'
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required'
    })
  })
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
      year: z.string().optional(),
      code: z.enum(['01', '02', '03']).optional(),
      startMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start Month is required'
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'End month is required'
        })
        .optional()
    })
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither'
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema
};
