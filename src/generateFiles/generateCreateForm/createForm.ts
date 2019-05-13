import { SchemaNameGenerator } from '@8base/schema-name-generator';
// @ts-ignore
import { tableSelectors } from '@8base/utils';
import * as changeCase from 'change-case';
import * as ejs from 'ejs';
import * as pluralize from 'pluralize';
import { formatCode } from '../../formatCode';
import { GeneratorsConfig, IGeneratorsData } from '../../types';
import { isFieldNeedsToInclude } from '../../utils';
import { chunks } from '../chunks';

// @ts-ignore
import createForm from './createForm.js.ejs';

export const generateCreateForm =
  ({ tablesList, tableName, screenName }: IGeneratorsData, { includeColumns }: GeneratorsConfig = {}) => {
    const table = tablesList.find(({ name }) => tableName === name);

    if (!table) { throw new Error(`Can't find a table ${tableName}`); }

    const entityName = pluralize.singular(tableName);
    const fields = table.fields.filter(({ isMeta, name }) => !isMeta && isFieldNeedsToInclude(name, includeColumns));

    const tableGenerated = ejs.render(createForm, {
      SchemaNameGenerator,
      changeCase,
      chunks,
      entityName,
      fields,
      pluralize,
      screenName: screenName || entityName,
      table,
      tableName,
      tableSelectors,
    });

    return formatCode(tableGenerated);
  };
