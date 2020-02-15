import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(value: Array<any>, field: string): Array<any> {
        const fields = field.split(".");
        if (!value)
            return [];
        const groupedObj = value.reduce((acc, cur, index, self) => {

            let groupByField: string | any = cur[fields[0]];
            let i = 1;
            while (typeof groupByField === "object") {
                groupByField = groupByField[fields[i++]];
            }

            if (!acc[groupByField]) {
                acc[groupByField] = [cur];
            }
            else {
                acc[groupByField].push(cur);
            }
            return acc;
        }, {});

        const groupedByArray = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
        return groupedByArray;
    }

    //transform(collection: Array, property: string): Array {
    //    // prevents the application from breaking if the array of objects doesn't exist yet
    //    if (!collection) {
    //        return null;
    //    }

    //    const groupedCollection = collection.reduce((previous, current) => {
    //        if (!previous[current[property]]) {
    //            previous[current[property]] = [current];
    //        } else {
    //            previous[current[property]].push(current);
    //        }

    //        return previous;
    //    }, {});

    //    // this will return an array of objects, each object containing a group of objects
    //    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    //}
}