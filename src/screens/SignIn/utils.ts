import * as Yup from 'yup';
import { errorTitles } from '../../utils/constants.ts';
import { validEmailRegExp, validPasswordRegExp } from '../../utils';

export const signInFormReviewSchema = Yup.object({
  email: Yup.string()
    .required(errorTitles.provideValidEmail)
    .test('emailValid', errorTitles.provideValidEmail, value =>
      value ? validEmailRegExp.test(value) : true,
    ),
  password: Yup.string()
    .required(errorTitles.provideValidPassword)
    .test('passwordValid', errorTitles.provideValidPassword, value =>
      value ? validPasswordRegExp.test(value) : true,
    ),
});
