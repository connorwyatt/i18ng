#!/usr/bin/env node

import {formatFiles, IFileFormatResult} from './utils/formatUtils';

formatFiles('./!(node_modules)/**/!(*.d).ts')
    .filter((fileFormatResult: IFileFormatResult) => {
      return fileFormatResult.currentFile != fileFormatResult.formattedFile;
    })
    .reduce(
        (accumulatedValue: Array<IFileFormatResult>, currentValue) => {
          accumulatedValue.push(currentValue);

          return accumulatedValue;
        },
        [])
    .subscribe((results: Array<IFileFormatResult>) => {
      if (results.length === 0) {
        console.log('All files match formatting rules.');

        return;
      }

      console.error('There are files that do not match the formatting rules:');

      results.forEach(result => {
        console.error(result.filePath);
      });

      process.exit(1);
    });
