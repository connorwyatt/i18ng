#!/usr/bin/env node

import {formatFiles, IFileFormatResult} from './utils/formatUtils';
import {replaceFileContents} from './utils/fileUtils';

formatFiles('./!(node_modules)/**/!(*.d).ts').subscribe((fileFormatResult: IFileFormatResult) => {
  if (fileFormatResult.currentFile != fileFormatResult.formattedFile) {
    replaceFileContents(fileFormatResult.filePath, fileFormatResult.formattedFile);
  }
});
