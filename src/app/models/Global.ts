
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
