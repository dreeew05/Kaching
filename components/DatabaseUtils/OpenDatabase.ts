import * as SQLite from 'expo-sqlite';

export const getDatabase = () => {
    return SQLite.openDatabase('kaching_db.db')
}