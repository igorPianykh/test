export const validEmailRegExp = RegExp(
  /^(?!\.)[^\s][\w\-.'+%!#$%&'*/=?^_+-`{|}~]*@([\w-]+\.)+\w+\s*$/,
);

export const validPasswordRegExp = RegExp(/^[a-zA-Z0-9]{6,60}$/);
