import { getDatabase } from "./OpenDatabase";

const db = getDatabase();

export const selectData = (tableName : string, columnData : string[],
    targetAttrib : string | null, targetValue : any) => {

    const columns : string = columnData.join(', ');
    
    let query : string = `SELECT ${columns} FROM ${tableName}`;

    if(targetAttrib != null) {
        const targetValueType = typeof(targetValue);
        if (targetValueType === 'string') {
            targetValue = `'${targetValue}'`;
        }
        query += ` WHERE ${targetAttrib} = ${targetValue}`;
    }

    return executeTransaction(query, [], 'select');

} 

export const insertData = (tableName : string, data : any[]) => {

    const columns : string = Object.keys(data[0]).join(', ');
    const placeholders : string = Object.values(data[0]).map(() => '?').join(', ');
    const values : any[] = Object.values(data[0]);

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return executeTransaction(query, values, 'insert')

}

export const updateData = (tableName : string, targetAttrib : string, 
    targetValue : any, refAttrib : string, refValue : any) => {

    const targetValueType = typeof(targetValue);
    if (targetValueType === 'string') {
        targetValue = `'${targetValue}'`;
    }

    const query = `UPDATE ${tableName} 
                    SET ${targetAttrib} = ${targetValue} 
                    WHERE ${refAttrib} = ?`;

    const value = [];
    value.push(refValue);

    console.log(query)
    console.log(value)
    return executeTransaction(query, value, 'update');

}

export const deleteData = (tableName : string, refAttrib : string, 
    refValue : any) => {

    const query = `DELETE FROM ${tableName} WHERE ${refAttrib} = ?`;

    const value = [];
    value.push(refValue);

    return executeTransaction(query, value, 'delete');

}

export const executeTransaction = (query : string, values : any[], 
    operation : string) => {

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, values, (_, result) => {
                if(operation == "select") {
                    resolve(result.rows._array)
                }
                else {
                    resolve(result);
                }
            }, (error): boolean => {
                reject(error);
                return false;
            });
        });
    });

}

