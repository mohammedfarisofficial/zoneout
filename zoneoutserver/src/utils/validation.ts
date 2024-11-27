
// Email validation
export const isValidEmail = (email: string): boolean => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
   return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
    const minLength = 8;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length >= minLength && passwordRegex.test(password);
  };
  