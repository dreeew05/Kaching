import { SQLResultSet } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';

export default function SaleDashboard() {
  const [currentSales, setCurrentSales] =
    useState<SQLResultSet | null>(null);
  const [currentOrders, setCurrentOrders] =
    useState<SQLResultSet | null>(null);

  const db = getDatabase();

  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COALESCE(SUM(receipt_items.quantity * receipt_items.price), 0) + eods.pettycash AS total_sales
        FROM eods
        LEFT JOIN eod_receipts ON eods.eod_id = eod_receipts.eod_id
        LEFT JOIN receipt_items ON eod_receipts.receipt_id = receipt_items.receipt_id
        LEFT JOIN item ON receipt_items.item_id = item.id
        LEFT JOIN category ON item.category_id = category.id
        WHERE eods.iscurrent = 1
        GROUP BY eods.eod_id`,
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            setCurrentSales(results);
          } else {
            setCurrentSales(null);
          }
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT count(receipt_id) AS total_orders FROM receipts`,
        [],
        (tx, results) => {
          setCurrentOrders(results);
        },
      );
    });
  };

  useEffect(() => {
    fetchCurrentEODData();
  }, [currentSales]);

  return (
    <View
      className="flex-row mb-5 py-3 px-10 items-center shadow-lg
                    shadow-neutral-600 rounded-lg self-center bg-white"
    >
      <View>
        <Text
          className=" px-7 self-center text-center 
                    text-green text-3xl font-bold"
        >
          ₱{(currentSales?.rows.item(0).total_sales || 0).toFixed(2)}
        </Text>
        <Text
          className=" px-7 self-center text-center text-black
                    text-sm opacity-50 font-base"
        >
          Total Amount
        </Text>
      </View>
      <Text
        className=" self-center text-center text-gray 
                    text-5xl font-thin"
      >
        |
      </Text>
      <View>
        <Text
          className=" px-7 self-center text-center text-green
                    text-3xl font-bold"
        >
          {currentOrders?.rows.item(0).total_orders}
        </Text>
        <Text
          className=" px-7 self-center text-center text-black
                    text-sm opacity-50 font-base"
        >
          Orders
        </Text>
      </View>
    </View>
  );
}
