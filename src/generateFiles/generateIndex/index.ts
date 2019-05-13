import * as changeCase from 'change-case';
import * as ejs from 'ejs';
import * as pluralize from 'pluralize';
import { formatCode } from '../../formatCode';

// @ts-ignore
import index from './index.js.ejs';

export const generateIndex = ({ tableName, screenName }: { tableName: string, screenName?: string }) => {
  const entityName = pluralize.singular(tableName);

  const tableGenerated = ejs.render(index, {
    changeCase,
    entityName,
    pluralize,
    screenName: screenName || entityName,
    tableName,
  });

  return formatCode(tableGenerated);
};
