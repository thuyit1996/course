type EnglishUser = {
    userId: string;
    roles: string[];
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phone: string;
    address: string;
  };
  
  type LoginResponse = {
    token: string;
    englishUser: EnglishUser;
  };
  export type { LoginResponse };