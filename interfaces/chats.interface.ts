import { ChildrenProps } from './general.interface';

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
  className?: string;
  action?: React.ReactNode;
}

export interface ChartData {
  label: string;
  value: number;
  fill?: string;
}

export interface ChartDataProps {
  typeData?: ChartData[];
  statusData?: ChartData[];
  barsChartData?: ChartData[];
}
