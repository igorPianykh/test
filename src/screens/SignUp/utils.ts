import * as Yup from 'yup';
import { errorTitles } from '../../utils/constants.ts';
import { validEmailRegExp, validPasswordRegExp } from '../../utils';

export const signUpFormReviewSchema = Yup.object({
  name: Yup.string().required(errorTitles.provideValidName),
  email: Yup.string()
    .required(errorTitles.provideValidEmail)
    .test('emailValid', errorTitles.provideValidEmail, value =>
      value ? validEmailRegExp.test(value) : true,
    ),
  password: Yup.string()
    .required(errorTitles.provideValidPassword)
    .test('passwordValid', errorTitles.passwordError, value =>
      value ? validPasswordRegExp.test(value) : true,
    ),
});
