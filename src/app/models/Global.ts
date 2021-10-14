import {Observable, throwError} from 'rxjs';

// prereq: length must be even
export function sliceIntoTuplesOfTwoFrom<T>(array: T[]): [T, T][] {
    const results: [T, T][] = [];
    array.forEach((item, i) => {
        if (i % 2 === 1) {
            results.push([array[i - 1], array[i]]);
        }
    });
    return results;
}

export function multipleFilesFromEvent(event: any): File[] {
    const fileList = event.target.files as FileList;
    const range: number[] = [];
    let i: number;
    for (i = 0; i < fileList.length; i ++) {
        range.push(i);
    }
    return range.map(n => fileList.item(n));
}

// Converts the error thrown in tryBlock into an error of the Observable
export function tryCatchWithObservable<T1, T2>(
    tryBlock: () => T1,
    observable: (arg: T1) => Observable<T2>
): Observable<T2> {
    try {
        return observable(tryBlock());
    } catch (error) {
        return throwError(error);
    } finally {

    }
}
