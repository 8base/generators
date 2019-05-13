
import { SchemaNameGenerator } from '@8base/schema-name-generator';
import * as changeCase from 'change-case';
import * as ejs from 'ejs';
import * as pluralize from 'pluralize';
import { formatCode } from '../../formatCode';
import { IGeneratorsData } from '../../types';
import { chunks } from '../chunks';

// @ts-ignore
import deleteForm from './deleteForm.js.ejs';

export const generateDeleteForm = ({ tablesList, tableName, screenName }: IGeneratorsData) => {
  const table = tablesList.find(({ name }) => tableName === name);

  if (!table) { throw new Error(`Can't find a table ${tableName}`); }

  const fields = table.fields.filter(({ isMeta }) => !isMeta);

  const entityName = pluralize.singular(tableName);

  const tableGenerated = ejs.render(deleteForm, {
    SchemaNameGenerator,
    changeCase,
    chunks,
    entityName,
    fields,
    pluralize,
    screenName: screenName || entityName,
    tableName,
  });

  return formatCode(tableGenerated);
};
