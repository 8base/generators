import { TableSchema } from '@8base/utils';

export interface GeneratorsCommonConfig {
  deep?: number;
  withMeta?: boolean;
}

export type GeneratorsConfig = {
  includeColumns?: string[],
} & GeneratorsCommonConfig;

export interface GeneratorsData {
  tablesList: TableSchema[];
  tableName: string;
  screenName?: string;
}

export interface ScreenTable {
  id?: string;
  tableName: string;
  screenName: string;
  routeUrl?: string;
  tableFields?: string[];
  formFields?: string[];
}
