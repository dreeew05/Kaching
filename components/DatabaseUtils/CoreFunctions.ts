import { getDatabase } from './OpenDatabase';
import { AllColumnCategoryProps } from './PromiseInterface';

const db = getDatabase();

export const selectData = (
  tableName: string,
  columnData: string[],
  targetAttrib: string | null = null,
  targetValue: any = null,
  orderBy: string | null = null,
  order: string = 'ASC',
): Promise<AllColumnCategoryProps | any> => {
  const columns: string = columnData.join(', ');

  let query: string = `SELECT ${columns} FROM ${tableName}`;

  if (targetAttrib != null) {
    const targetValueType = typeof targetValue;
    if (targetValueType === 'string') {
      targetValue = `'${targetValue}'`;
    }
    query += ` WHERE ${targetAttrib} = ${targetValue}`;
  }
  if (orderBy != null) {
    query += ` ORDER BY ${orderBy} ${order}`;
  }

  return executeTransaction(query, [], 'select');
};

export const insertData = (tableName: string, data: any[]) => {
  const columns: string = Object.keys(data[0]).join(', ');
  const placeholders: string = Object.values(data[0])
    .map(() => '?')
    .join(', ');
  const values: any[] = Object.values(data[0]);

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  return executeTransaction(query, values, 'insert');
};

export const updateData = (
  tableName: string,
  targetAttrib: string[],
  targetValue: any[],
  refAttrib: string,
  refValue: any,
) => {
  let updateSentence = '';

  targetAttrib.map((item, index) => {
    const currenTargetValue = targetValue[index];
    const targetValueType = typeof currenTargetValue;

    if (targetValueType === 'string') {
      targetValue[index] = `'${currenTargetValue}'`;
    }

    if (index != targetValue.length - 1) {
      updateSentence += `${item} = ${targetValue[index]}, `;
    } else {
      updateSentence += `${item} = ${targetValue[index]}`;
    }
  });

  const query = `UPDATE ${tableName} 
    SET ${updateSentence} 
    WHERE ${refAttrib} = ?`;

  const value = [];
  value.push(refValue);

  return executeTransaction(query, value, 'update');
};

export const deleteData = (
  tableName: string,
  refAttrib: string,
  refValue: any,
) => {
  const query = `DELETE FROM ${tableName} WHERE ${refAttrib} = ?`;

  const value = [];
  value.push(refValue);

  return executeTransaction(query, value, 'delete');
};

export const softDeleteData = (
  tableName: string,
  refAttrib: string,
  refValue: any,
) => {
  const query = `UPDATE ${tableName} SET is_deleted = 1 WHERE ${refAttrib} = ?`;

  const value = [];
  value.push(refValue);

  return executeTransaction(query, value, 'delete');
};

export const executeTransaction = (
  query: string,
  values: any[],
  operation: string,
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        values,
        (_, result) => {
          if (operation == 'select') {
            // resolve(result.rows._array)
            if (result.rows.length != 0) {
              resolve(result.rows._array);
            }
          } else {
            resolve(result);
          }
        },
        (error): boolean => {
          reject(error);
          return false;
        },
      );
    });
  });
};
