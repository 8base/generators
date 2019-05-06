import { SchemaNameGenerator } from '@8base/schema-name-generator';
import { createQueryColumnsList, createTableFilterGraphqlTag, tableSelectors } from '@8base/utils';
import * as changeCase from 'change-case';
import * as ejs from 'ejs';
import * as pluralize from 'pluralize';
import { formatCode } from '../../formatCode';
import { GeneratorsConfig, GeneratorsData } from '../../types';
import { chunks } from '../chunks';

// @ts-ignore
import tableTemplate from './table.js.ejs';

export const generateTable =
  ({ tablesList, tableName, screenName }: GeneratorsData, config: GeneratorsConfig) => {
    const table = tablesList.find(({ name }) => tableName === name);

    if (!table) { throw new Error(`Can't find a table ${tableName}`); }

    const entityName = pluralize.singular(tableName);
    const queryText = createTableFilterGraphqlTag(tablesList, tableName, config);
    const columns = createQueryColumnsList(tablesList, tableName, config);

    const tableGenerated = ejs.render(tableTemplate, {
      chunks,
      tableSelectors,
      table,
      queryText,
      columns,
      changeCase,
      pluralize,
      SchemaNameGenerator,
      tableName,
      entityName,
      screenName: screenName || entityName,
    });

    return formatCode(tableGenerated);
  };
