import * as ejs from 'ejs';
import * as changeCase from 'change-case';
import { formatCode } from '../../formatCode';
import { chunks } from '../chunks';

// @ts-ignore
import root from './root.js.ejs';

export const generateRoot = (screens: Object[]) => {
  const rootGenerated = ejs.render(root, {
    chunks,
    screens,
    changeCase,
  });

  return formatCode(rootGenerated);
};
