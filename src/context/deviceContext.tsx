import React, { createContext, ReactNode, useState } from 'react';
import { DeviceType } from '../screens/SignIn/entities.ts';

export const DeviceContext = createContext<{
  device: any;
  setDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
}>({
  device: null,
  setDevice: () => {},
});

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [device, setDevice] = useState<DeviceType>(null);

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};
