export const isOldEnough = (dateString: string): boolean => {
  const birthDate = new Date(dateString);
  const today = new Date();

  // Calculate the age
  const age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year
  const hasBirthdayOccurred =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  // Adjust age based on birthday occurrence
  const adjustedAge = hasBirthdayOccurred ? age : age - 1;

  // Check if the adjusted age is greater than or equal to 13
  return adjustedAge >= 13;
};

export const isAlpha = (str: string): boolean => {
  var regex = /^[a-zA-Z\-\s.]+$/;
  return regex.test(str);
};

export const isEmail = (str: string): boolean => {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(str);
};

export const isValidPassword = (str: string, len: number): boolean => {
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
  const hasDigit = /\d/.test(str);
  const hasUpperCase = /[A-Z]/.test(str);
  const hasLowerCase = /[a-z]/.test(str);
  const longEnough = str?.length >= len;

  // Return true if all conditions are met
  console.info({
    hasSymbol,
    hasDigit,
    longEnough,
    hasUpperCase,
    hasLowerCase,
    result: hasSymbol && hasDigit && hasUpperCase && hasLowerCase && longEnough
  })
  return hasSymbol && hasDigit && hasUpperCase && hasLowerCase && longEnough;
};
