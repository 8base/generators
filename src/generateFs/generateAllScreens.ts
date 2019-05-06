
import { TableSchema } from '@8base/utils';
import { generateCreateForm } from '../generateFiles/generateCreateForm/createForm';
import { generateDeleteForm } from '../generateFiles/generateDeleteForm/deleteForm';
import { generateEditForm } from '../generateFiles/generateEditForm/editForm';
import { generateIndex } from '../generateFiles/generateIndex';
import { generateRoot } from '../generateFiles/generateRoot/generateRoot';
import { generateTable } from '../generateFiles/generateTable/table';
import { GeneratorsConfig, ScreenTable } from '../types';
import { getCreateFormFileName, getDeleteFormFileName, getEditFormFileName, getScreenFolderName, getTableFileName } from './generateFileNames';

interface GenerateProjectFsData {
  tablesList: TableSchema[];
  screens: ScreenTable[];
}

export const generateAllScreens = ({ tablesList, screens }: GenerateProjectFsData, config: GeneratorsConfig) => {
  const fs: { [key: string]: string } = {};

  screens.forEach(({ screenName, tableName, tableFields, formFields }) => {
    const generatorData = { tablesList, tableName, screenName };
    fs[`src/routes/${getScreenFolderName(screenName)}/${getCreateFormFileName(screenName)}`] =
      generateCreateForm(generatorData, { ...config, includeColumns: formFields });

    fs[`src/routes/${getScreenFolderName(screenName)}/${getEditFormFileName(screenName)}`] =
      generateEditForm(generatorData, { ...config, includeColumns: formFields });

    fs[`src/routes/${getScreenFolderName(screenName)}/${getDeleteFormFileName(screenName)}`] =
      generateDeleteForm(generatorData);

    fs[`src/routes/${getScreenFolderName(screenName)}/${getTableFileName(screenName)}`] =
      generateTable(generatorData, { ...config, includeColumns: tableFields });

    fs[`src/routes/${getScreenFolderName(screenName)}/index.js`] =
      generateIndex(generatorData);
  });

  fs['src/Root.js'] = generateRoot(screens);

  return fs;
};
