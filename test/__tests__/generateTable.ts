

import { generateTable } from '../../src';
import { tablesSchema } from '../__fixtures__/tablesSchema';


it('should generate table by the table name', () => {
  const generatedTable = generateTable({
    tablesList: tablesSchema,
    tableId: 'PROPERTIES_ID',
  }, {
    deep: 2,
    withMeta: false,
  });

  expect(generatedTable).toMatchSnapshot();
});

