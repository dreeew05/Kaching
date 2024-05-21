import { getDatabase } from './OpenDatabase';

const db = getDatabase();

// Useless
// const initializeMainTable = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS main(
//                 storename TEXT NOT NULL PRIMARY KEY,
//                 setup_complete INTEGER NOT NULL
//             )`,
//     );
//   });
// };

const initializeCategoryTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS category(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                image TEXT
            )`,
    );
  });
};

const initializeItemTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS item(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price NUMERIC NOT NULL,
                image TEXT NOT NULL,
                category_id INTEGER NOT NULL,
                description TEXT,
                is_available INTEGER NOT NULL DEFAULT 1
            )`,
    );
  });
};

const initializeCategoryItemTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS category_items(
                category_id INTEGER NOT NULL,
                item_id INTEGER NOT NULL,
                FOREIGN KEY(category_id) REFERENCES category(id),
                FOREIGN KEY(item_id) REFERENCES item(id)
            );`,
    );
  });
};

const initializeReceiptTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS receipts(
                receipt_id INTEGER NOT NULL PRIMARY KEY,
                total NUMERIC NOT NULL,
                amount_paid NUMERIC NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                mode_of_payment TEXT NOT NULL
            )`,
    );
  });
};

const initializeReceiptItemTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS receipt_items(
                receipt_id INTEGER NOT NULL,
                item_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                price NUMERIC NOT NULL,
                FOREIGN KEY(receipt_id) REFERENCES receipts(receipt_id),
                FOREIGN KEY(item_id) REFERENCES item(item_id)
            )`,
    );
  });
};

const initializeStoreTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS store(
                storename TEXT NOT NULL PRIMARY KEY,
                setup_complete INTEGER NOT NULL
            )`,
    );
  });
};

const initializeEODTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS eods(
                eod_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                cashiername TEXT NOT NULL,
                contactnum TEXT NOT NULL,
                pettycash NUMERIC NOT NULL DEFAULT 0,
                start DATETIME DEFAULT CURRENT_TIMESTAMP,
                end DATETIME DEFAULT CURRENT_TIMESTAMP,
                iscurrent INTEGER NOT NULL DEFAULT 1
            )`,
    );
  });
};

const initializeEODReceiptTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS eod_receipts(
                eod_id INTEGER NOT NULL,
                receipt_id INTEGER NOT NULL,
                FOREIGN KEY(eod_id) REFERENCES eods(eod_id),
                FOREIGN KEY(receipt_id) REFERENCES receipts(receipt_id)
            )`,
    );
  });
};

const initializeDatePickedTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS date_picked(
                date_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL
            )`,
    ),
      (error: any) => {
        console.log(error);
      };
  });
};

export const initializeDatabase = () => {
  initializeCategoryTable();
  initializeItemTable();
  initializeCategoryItemTable;
  initializeReceiptTable();
  initializeReceiptItemTable();
  initializeEODTable();
  initializeEODReceiptTable();
  initializeStoreTable();
  initializeDatePickedTable();
};
