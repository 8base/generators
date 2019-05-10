import { SchemaNameGenerator } from '@8base/schema-name-generator';
// @ts-ignore
import { createTableRowUpdateTag, createTableRowQueryTag , tableSelectors } from '@8base/utils';
import * as changeCase from 'change-case';
import * as ejs from 'ejs';
import * as pluralize from 'pluralize';
import { formatCode } from '../../formatCode';
import { GeneratorsConfig, GeneratorsData } from '../../types';
import { isFieldNeedsToInclude } from '../../utils';
import { chunks } from '../chunks';

// @ts-ignore
import editForm from './editForm.js.ejs';

export const generateEditForm = ({ tablesList, tableName, screenName }: GeneratorsData, { includeColumns }: GeneratorsConfig = {}) => {
  const table = tablesList.find(({ name }) => tableName === name);

  if (!table) { throw new Error(`Can't find a table ${tableName}`); }

  const entityName = pluralize.singular(tableName);
  const mutationText = createTableRowUpdateTag(tablesList, tableName);
  const queryEntityText = createTableRowQueryTag(tablesList, tableName, { withMeta: false });
  const fields = table.fields.filter(({ isMeta, name }) => !isMeta && isFieldNeedsToInclude(name, includeColumns));

  const tableGenerated = ejs.render(editForm, {
    changeCase,
    chunks,
    entityName,
    queryEntityText,
    fields,
    mutationText,
    pluralize,
    SchemaNameGenerator,
    screenName: screenName || entityName,
    table,
    tableName,
    tableSelectors,
  });

  return formatCode(tableGenerated);
};
