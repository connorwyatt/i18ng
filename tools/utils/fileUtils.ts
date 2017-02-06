import {readFile, writeFile} from 'fs';
import {Glob} from 'glob';
import {Observable, Subject} from 'rxjs';

export function expandGlobsToFiles(globPattern: string): Observable<IExpandedGlobResult> {
  return new Observable(subscriber => {
           const glob = new Glob(globPattern);

           glob.on('match', (filePath: string) => {
             subscriber.next(filePath);
           });

           glob.on('end', () => {
             subscriber.complete();
           });

           glob.on('error', (error: any) => {
             subscriber.error(error);
           });
         })
      .flatMap((filePath: string) => {
        return getFileContents(filePath).map(contents => {
          return {contents, filePath};
        });
      });
}

export function getFileContents(filePath: string): Observable<string> {
  return new Observable(subscriber => {
    readFile(filePath, 'UTF8', (err, contents) => {
      if (err) {
        subscriber.error(err);
        return;
      }

      subscriber.next(contents);
      subscriber.complete();
    });
  });
}

export function replaceFileContents(filePath: string, contents: string): Observable<any> {
  const subject = new Subject();

  writeFile(filePath, contents, err => {
    if (err) {
      subject.error(err);

      return;
    }

    subject.next(true);
    subject.complete();
  });

  return subject.asObservable();
}

export interface IExpandedGlobResult {
  filePath: string;
  contents: string;
}
