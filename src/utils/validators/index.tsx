export const validators = {
  validateEmail,
};

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
