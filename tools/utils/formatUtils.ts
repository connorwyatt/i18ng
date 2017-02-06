import * as clangFormat from 'clang-format';
import {Observable} from 'rxjs';
import * as Vinyl from 'vinyl';

import {expandGlobsToFiles, IExpandedGlobResult} from './fileUtils';

export function formatFiles(globPattern: string): Observable<IFileFormatResult> {
  return expandGlobsToFiles(globPattern).flatMap((result: IExpandedGlobResult) => {
    const vinyl = new Vinyl({path: result.filePath, contents: new Buffer(result.contents)});

    return getFormattedFileContents(vinyl).map((formattedFileContents: string): IFileFormatResult => {
      return {filePath: result.filePath, currentFile: result.contents, formattedFile: formattedFileContents};
    });
  });
}

function getFormattedFileContents(file: Vinyl): Observable<string> {
  return new Observable(subscriber => {
           clangFormat(file, null, 'file', () => {})
               .on('data',
                   data => {
                     subscriber.next(data);
                   })
               .on('error',
                   error => {
                     subscriber.error(error);
                   })
               .on('end', () => {
                 subscriber.complete();
               });
         })
      .reduce((accumulatedValue, currentValue) => {
        return accumulatedValue + currentValue.toString();
      }, '');
}

export interface IFileFormatResult {
  filePath: string;
  currentFile: string;
  formattedFile: string;
}
