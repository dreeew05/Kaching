import { View, Text } from 'react-native';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { SQLResultSet } from 'expo-sqlite';

export default function SaleDashboard() {
  const [currentSales, setCurrentSales] = useState<SQLResultSet|null>(null);
  const [currentOrders, setCurrentOrders] = useState<SQLResultSet|null>(null);

  const db = getDatabase();

  const fetchCurrentEODData = () => {
  db.transaction(tx => {
    tx.executeSql(`SELECT SUM(receipt_items.quantity * receipt_items.price) AS total_sales
      FROM receipt_items
      JOIN item ON receipt_items.item_id = item.id
      JOIN category ON item.category_id = category.id`, 
      [],
      (tx, results) => {
        setCurrentSales(results);        
      },
    )
  })

  db.transaction(tx => {
    tx.executeSql(`SELECT count(receipt_id) AS total_orders FROM receipts`, 
      [],
      (tx, results) => {
        setCurrentOrders(results);
      },
    )
  })
}

  useEffect(() => {
    fetchCurrentEODData();
  }
  , [currentSales]);

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
          ₱{currentSales?.rows.item(0).total_sales}
        </Text>
        <Text
          className=" px-7 self-center text-center text-black
                    text-sm opacity-50 font-base"
        >
          Total Sales
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
