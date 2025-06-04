import { PeripheralInfo } from 'qardioBluetooth';

export interface BleError {
  message: string;
}

export interface ValueFromNotify {
  value: number[];
  peripheral: PeripheralInfo;
  characteristic: string;
  service: string;
}

export type SetStateError = BleError | null | string;

export interface BleState {
  args: {
    state: string;
  };
}

export interface BPState {
  inProgress: boolean;
}

export type MeasurementErrorRouteParams = {
  Params: {
    error: {
      title: string;
      message: string;
    };
  };
};

interface Measurements {
  sys: number;
  dia: number;
  pulse: number;
}

export interface BPMeasurementsType {
  bpMeasurements: Measurements;
}
