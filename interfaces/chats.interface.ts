import { ChildrenProps } from './general.inteface';

export interface ChartCategory {
  label: string;
  color?: string;
}

export interface ChartLabelConfig {
  [key: string]: ChartCategory;
}

export interface ChartContainerProps extends ChildrenProps {
  title?: string;
  subtitle?: string;
  labelConfig: ChartLabelConfig;
}

export interface ChartData {
  label: string;
  value: number;
  fill?: string;
}

export interface ChartDataProps {
  chartData: ChartData[];
}
