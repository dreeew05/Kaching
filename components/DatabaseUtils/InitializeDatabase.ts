import { getDatabase } from "./OpenDatabase";

const db = getDatabase();

const initializeMainTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS main(
                storeName TEXT NOT NULL PRIMARY KEY
            )`
        )
    })
}

const initializeCategoryTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS category(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                image TEXT
            )`
        )
    })
}

const initializeItemTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS item(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price NUMERIC NOT NULL,
                image TEXT NOT NULL,
                description TEXT
            )`
        )
    })
}

const initializeCategoryItemTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS category_items(
                category_id INTEGER NOT NULL,
                item_id INTEGER NOT NULL,
                FOREIGN KEY(category_id) REFERENCES category(id),
                FOREIGN KEY(item_id) REFERENCES item(id)
            )`
        )
    })
}

const initializeReceiptTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS receipts(
                receipt_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                total NUMERIC NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                mode_of_payment TEXT NOT NULL,
            )`
        )
    })
}

const initializeReceiptItemTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS receipt_items(
                receipt_id INTEGER NOT NULL,
                item_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                FOREIGN KEY(receipt_id) REFERENCES receipts(receipt_id),
                FOREIGN KEY(item_id) REFERENCES item(item_id)
            )`
        )
    })
}

const initializeEODTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS eods(
                eod_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                storename TEXT NOT NULL,
                address TEXT NOT NULL,
                cashiername TEXT NOT NULL,
                contactnum TEXT NOT NULL,
                start DATETIME DEFAULT CURRENT_TIMESTAMP,
                end DATETIME DEFAULT CURRENT_TIMESTAMP,
            )`
        )
    })
}

const initializeEODReceiptTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS eod_receipts(
                eod_id INTEGER NOT NULL,
                receipt_id INTEGER NOT NULL,
                FOREIGN KEY(eod_id) REFERENCES eods(eod_id),
                FOREIGN KEY(receipt_id) REFERENCES receipts(receipt_id)
            )`
        )
    })
}

export const initializeDatabase = () => {
    initializeMainTable()
    initializeCategoryTable()
    initializeItemTable()
    initializeCategoryItemTable
    initializeReceiptTable()
    initializeReceiptItemTable()
    initializeEODTable()
    initializeEODReceiptTable()
}