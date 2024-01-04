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
                category_id INTEGER NOT NULL,
                description TEXT
            )`
        )
    })
}

export const initializeDatabase = () => {
    initializeMainTable()
    initializeCategoryTable()
    initializeItemTable()
}