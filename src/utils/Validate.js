export const checkValidData = (email, password, name = "") => {
  console.log(name, email, password);
  const isEmailValid =
    name &&
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const isPasswordValid =
    password &&
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid = name && /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  if (!isNameValid) {
    return "Name is not valid";
  }
  if (!isEmailValid) {
    return "Email is not valid";
  }
  if (!isPasswordValid) {
    return "Password is not valid";
  }
  return null;
};
