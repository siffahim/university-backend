import ApiError from '../../../errors/AprError';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterToDB = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const createSemester = await AcademicSemester.create(payload);

  if (!createSemester) {
    throw new ApiError(400, 'Failed to create academic semester');
  }

  return createSemester;
};

export const AcademicSemesterService = {
  createAcademicSemesterToDB
};
