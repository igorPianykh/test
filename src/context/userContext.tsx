import React, { createContext, ReactNode, useState } from 'react';
import { UserType } from '../screens/SignIn/entities.ts';

export const UserContext = createContext<{
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserType>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
