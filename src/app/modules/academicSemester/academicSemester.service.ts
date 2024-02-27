import ApiError from '../../../errors/AprError';
import { AcademicSemesterCodeTitleMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterToDB = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (AcademicSemesterCodeTitleMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Invalid semester code!');
  }

  const createSemester = await AcademicSemester.create(payload);
  return createSemester;
};

export const AcademicSemesterService = {
  createAcademicSemesterToDB
};
