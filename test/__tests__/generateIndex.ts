

import { generateIndex } from '../../src';
import { tablesSchema } from '../__fixtures__/tablesSchema';


it('should generate table by the table name', () => {
  const generatedTable = generateIndex({
    tablesList: tablesSchema,
    tableId: 'PROPERTIES_ID',
    screenName: 'Properties',
  });

  expect(generatedTable).toMatchSnapshot();
});

