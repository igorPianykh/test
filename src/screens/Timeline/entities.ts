export type MeasurementItem = {
  time: string;
  sys: number;
  dia: number;
  pulse: number;
};

export type FormattedMeasurementData = {
  title: string;
  data: MeasurementItem[];
}[];
