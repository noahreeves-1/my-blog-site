import { createContext, ReactNode, useState } from "react";

export const AuthContext = createContext<UserContextType>({
  auth: null,
  setAuth: () => {},
});

interface Props {
  children?: ReactNode;
}

interface UserType {
  username: string;
  password: string;
  accessToken: string;
  roles: string[];
}

interface UserContextType {
  auth?: UserType | null;
  setAuth: (newAuth: UserType | null) => void;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<UserType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export the variable "AuthContext" which was created with createContext({})
// export default AuthContext;
