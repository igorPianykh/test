import { QuickSQLiteConnection } from 'react-native-quick-sqlite';
import { InterfaceToastProps } from '@gluestack-ui/toast/lib/typescript/types';

export type DatabaseContextType = QuickSQLiteConnection | null;

export interface ToastService {
  show: (props: InterfaceToastProps) => void;
  close: (id: string) => void;
  closeAll: () => void;
  isActive: (id: string) => boolean;
}

export type UserType = {
  id: string;
  name: string;
  email: string;
} | null;

export type DeviceType = {
  id: string;
} | null;
