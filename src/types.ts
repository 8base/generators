import { TableSchema } from '@8base/utils';

export interface IGeneratorsCommonConfig {
  deep?: number;
  withMeta?: boolean;
}

export type GeneratorsConfig = {
  includeColumns?: string[],
} & IGeneratorsCommonConfig;

export interface IGeneratorsData {
  tablesList: TableSchema[];
  tableName: string;
  screenName?: string;
}

export interface IScreenTable {
  id?: string;
  tableName: string;
  screenName?: string;
  routeUrl?: string;
  tableFields?: string[];
  formFields?: string[];
}
