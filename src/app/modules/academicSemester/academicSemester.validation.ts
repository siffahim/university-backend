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

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema
};
