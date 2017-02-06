#!/usr/bin/env node

import {formatFiles, IFileFormatResult} from './utils/formatUtils';
import {replaceFileContents} from './utils/fileUtils';

formatFiles('./!(node_modules)/**/!(*.d).ts')
    .filter((fileFormatResult: IFileFormatResult) => {
      return fileFormatResult.currentFile != fileFormatResult.formattedFile;
    })
    .subscribe((fileFormatResult: IFileFormatResult) => {
      replaceFileContents(fileFormatResult.filePath, fileFormatResult.formattedFile);
    });
