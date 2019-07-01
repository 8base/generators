

import { generateEditForm } from '../../src';
import { tablesSchema } from '../__fixtures__/tablesSchema';


it('should generate update form by the table name', () => {
  const generatedEditForm = generateEditForm({
    tablesList: tablesSchema,
    tableId: 'PROPERTIES_ID',
  });

  expect(generatedEditForm).toMatchSnapshot();
});
