import { StatusCodes } from 'http-status-codes';
import { startSession } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/AprError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.util';

const createStudentToDB = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default student pass
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  let newUserAllData = null;
  const session = await startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    user.student = createStudent[0]._id;
    const createUser = await User.create([user], { session });

    if (!createUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = createUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester'
        },
        {
          path: 'academicDepartment'
        },
        {
          path: 'academicFaculty'
        }
      ]
    });
  }

  return newUserAllData;
};

const createFacultyToDB = async (faculty: IFaculty, user: IUser) => {
  //set role
  user.role = 'faculty';

  let newUserAllData;
  const session = await startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const createFaculty = await Faculty.create([faculty], { session });
    if (!createFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created faculty');
    }

    user.faculty = createFaculty[0]._id;

    const createUser = await User.create([user], { session });
    if (!createUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to created user');
    }

    newUserAllData = createUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }]
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudentToDB,
  createFacultyToDB
};
