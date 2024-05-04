import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
 
export default function HomeScreen() {
  const db = SQLite.openDatabase('kaching.db');

    // ~~~ CREATING TABLES ~~~

    // Create category table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS category (\
                ctg_id INTEGER PRIMARY KEY AUTOINCREMENT, \
                name TEXT NOT NULL, \
                img TEXT NOT NULL \
            )'
        )
    })

    // Create item table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS item (\
                itm_id INTEGER PRIMARY KEY AUTOINCREMENT, \
                name TEXT NOT NULL, \
                dsc TEXT, \
                price REAL NOT NULL, \
                img TEXT NOT NULL \
            )'
        )
    })

    // Create category_item table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS category_item ( \
                ctg_id INTEGER NOT NULL, \
                itm_id INTEGER NOT NULL UNIQUE, \
                FOREIGN KEY (ctg_id) \
                    REFERENCES category (ctg_id) \
                        ON UPDATE CASCADE \
                        ON DELETE CASCADE, \
                FOREIGN KEY (itm_id) \
                    REFERENCES item (itm_id) \
                        ON UPDATE CASCADE \
                        ON DELETE CASCADE \
            )'
        )
    })

    // Create receipt table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS receipt ( \
                rct_id INTEGER PRIMARY KEY AUTOINCREMENT, \
                datetime_recorded TEXT DEFAULT datetime(\'now\',\'localtime\'), \
                amt_total REAL DEFAULT 0 \
            )'
        )
    })

    // Create receipt_item table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS receipt_item (\
                rct_id INTEGER NOT NULL, \
                itm_id INTEGER NOT NULL, \
                qty INTEGER NOT NULL, \
                FOREIGN KEY (rct_id) \
                    REFERENCES receipt (rct_id) \
                        ON UPDATE CASCADE \
                        ON DELETE CASCADE, \
                FOREIGN KEY (itm_id) \
                    REFERENCES item (itm_id) \
                        ON UPDATE CASCADE \
                        ON DELETE CASCADE \
            )'
        )
    })

    // Create EOD table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS eod (\
                eod_id INTEGER PRIMARY KEY AUTOINCREMENT, \
                emp_name TEXT NOT NULL, \
                emp_contact TEXT NOT NULL, \
                datetime_start TEXT DEFAULT datetime(\'now\',\'localtime\'), \
                datetime_end TEXT \
            )'
        )
    })

    // Create eod_receipt table
    db.transaction (tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS eod_receipt (\
                eod_id INTEGER NOT NULL, \
                rct_id INTEGER NOT NULL UNIQUE, \
                FOREIGN KEY (eod_id) \
                    REFERENCES eod (eod_id), \
                        ON UPDATE CASCADE \
                        ON DELETE CASCADE, \
                FOREIGN KEY (rct_id) \
                    REFERENCES receipt (rct_id) \
                    ON UPDATE CASCADE \
                    ON DELETE CASCADE \
            )'
        )
    })

    // ~~~ INSERTING DATA ~~~

    // Add category in category table
    const [currCategory, setCurrCategory] = useState('');
    const [currImage, setCurrImage] = useState("../assets/images/categories/appetizer.jpg");
    const addCategory = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO category (name, img) VALUES (?, ?)', [currCategory, currImage],
                (txObj, resultSet) => console.log('Category added: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Add item in item table
    const [currItem, setCurrItem] = useState('');
    const [currDesc, setCurrDesc] = useState('');
    const [currPrice, setCurrPrice] = useState(0);
    const [currItemImg, setCurrItemImg] = useState("../assets/images/items/cheeseburger.jpg");
    const ctg_id = 1;
    const [itm_id, setItmId] = useState(0);

    const addItem = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO item (name, dsc, price, img) VALUES (?, ?, ?, ?)', [currItem, currDesc, currPrice, currItemImg],
                (txObj, resultSet) => {
                    console.log('Item added: ', resultSet)
                    setItmId(resultSet.insertId || 0)
                }, //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Add item in category_item table
    const addCategoryItem = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO category_item (ctg_id, itm_id) VALUES (?, ?)', [ctg_id, itm_id],
                (txObj, resultSet) => console.log('Category Item added: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Add receipt in receipt table
    const [currReceipt, setCurrReceipt] = useState(0);
    const addReceipt = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO receipt DEFAULT VALUES', [],
                (txObj, resultSet) => {
                    console.log('Receipt added: ', resultSet)
                    setCurrReceipt(resultSet.insertId || 0)
                } //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Get quantity of item in receipt_item table
    const [currQty, setCurrQty] = useState(0);
    const getQty = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT qty FROM receipt_item WHERE rct_id = ? AND itm_id = ?', [currReceipt, itm_id],
                (txObj, resultSet) => {
                    console.log('Quantity: ', resultSet)
                    setCurrQty(resultSet.insertId || 0)
                } //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Add item in receipt_item table
    const addToReceipt = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO receipt_item (rct_id, itm_id, qty) VALUES (?, ?, ?)', [currReceipt, itm_id, currQty],
                (txObj, resultSet) => console.log('Receipt added: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Remove item in receipt_item table
    const removeFromReceipt = () => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM receipt_item WHERE rct_id = ? AND itm_id = ?', [currReceipt, itm_id],
                (txObj, resultSet) => console.log('Receipt removed: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Increment quantity of item in receipt_item table
    const incrementQty = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO receipt_item (rct_id, itm_id, qty) VALUES (?, ?, ?)', [currReceipt, itm_id, currQty + 1],
                (txObj, resultSet) => console.log('Receipt incremented: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Decrement quantity of item in receipt_item table
    const decrementQty = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO receipt_item (rct_id, itm_id, qty) VALUES (?, ?, ?)', [currReceipt, itm_id, currQty - 1],
                (txObj, resultSet) => console.log('Receipt decremented: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Update amt_total in receipt table
    const [currTotal, setCurrTotal] = useState(0);
    const [currItemList, setCurrItemList] = useState([[0,0],]);
    const updateAmtTotal = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT itm_id, qty FROM receipt_item WHERE rct_id = ?', [currReceipt],
                (txObj, resultSet) => {
                    console.log('Cart: ', resultSet)
                    let resultLength = 0;
                    for (; resultLength < resultSet.rows.length; resultLength++) {
                        currItemList[resultLength] = [resultSet.rows.item(resultLength)['itm_id'], resultSet.rows.item(resultLength)['qty']];
                    }
                    setCurrItemList(currItemList.splice(resultLength, currItemList.length - resultLength));
                } //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })

        db.transaction(tx => {
            for (let i = 0; i < currItemList.length; i++) {
                tx.executeSql(
                    'SELECT price FROM item WHERE itm_id = ?', [currItemList[i][0]],
                    (txObj, resultSet) => {
                        console.log('Price: ', resultSet)
                        setCurrTotal(currTotal + resultSet.rows.item(0)['price'] * currItemList[i][1]);
                    } //,
                    // (txObj, error) => console.log('Error: ', error)
                )
            }
        })
    }

    // Add datetime_recorded in receipt table
    const recordReceipt = () => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE receipt SET datetime_recorded = datetime(\'now\',\'localtime\') WHERE rct_id = ?', [currReceipt],
                (txObj, resultSet) => console.log('Receipt recorded: ', resultSet) //,
                // (txObj, error) => console.log('Error: ', error)
            )
        })
    }

    // Add eod in eod table
    const [currEOD, setCurrEOD] = useState(0);
    const [empName, setEmpName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
};