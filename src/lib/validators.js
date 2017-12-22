export const required = value => (value ? undefined : 'Required');
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid'
    : undefined;

export const minLength = min => value =>
  value && value.length < min ? `must be ${min} characters or more` : undefined;
export const minLength8 = minLength(8);
export const isExact = exact => value => {
  return value !== exact ? 'Invalid' : undefined;
};
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
