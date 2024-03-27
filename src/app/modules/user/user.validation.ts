import { z } from 'zod';
import { bloodGroup, gender } from '../../../constants/common';
import { designation } from '../faculty/faculty.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' })
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required'
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is required'
      }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact number is required'
      }),
      presentAddress: z.string({
        required_error: 'Present address is required'
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required'
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation name is required'
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact is required'
        }),
        motherName: z.string({ required_error: 'Mother name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required'
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact is required'
        }),
        address: z.string({ required_error: 'Guardian address is required' })
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local guardian name is required' }),
        occupation: z.string({
          required_error: 'Local guardian  occupation is required'
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact no is required'
        }),
        address: z.string({
          required_error: 'Local guardian address is required'
        })
      }),
      profileImage: z.string().optional()
    })
  })
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last name is required' })
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required'
      }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact No is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is required'
      }),
      presentAddress: z.string({
        required_error: 'Present address is required'
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required'
      }),
      bloodGroup: z.enum([...(bloodGroup as [string, ...string[]])], {
        required_error: 'Blood group is required'
      }),
      designation: z.enum([...(designation as [string, ...string[]])], {
        required_error: 'Designation is required'
      }),
      profileImage: z.string().optional()
    })
  })
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last name is required' })
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required'
      }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact No is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is required'
      }),
      presentAddress: z.string({
        required_error: 'Present address is required'
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required'
      }),
      bloodGroup: z.enum([...(bloodGroup as [string, ...string[]])], {
        required_error: 'Blood group is required'
      }),
      designation: z.string({
        required_error: 'Designation is required'
      }),
      profileImage: z.string().optional()
    })
  })
});

//await createUserZodSchema.parseAsync(req);
export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema
};
