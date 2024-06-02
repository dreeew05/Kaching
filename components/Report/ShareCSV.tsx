import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TableData {
  header: string[];
  tableData: string[][];
}

function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

const ShareCSV: React.FC<{ data: TableData[] }> = ({ data }) => {
  const [csvData, setCSVData] = useState('');
  const [csvFileName, setCSVFileName] = useState('');
  const [csvFilePath, setCSVFilePath] = useState('');

  const date = new Date();

  const generateCSV = async () => {
    try {
      // Create a temporary directory
      const tempDir = FileSystem.cacheDirectory + 'csv_temp/';
      await FileSystem.makeDirectoryAsync(tempDir, {
        intermediates: true,
      });

      // Create a CSV file
      let csvData = '';
      data.forEach((table) => {
        // Add the header row
        csvData += table.header.join(',') + '\n';

        // Process each row in the table data
        table.tableData.forEach((row) => {
          // Remove the peso sign from each cell in the row
          let processedRow = row.map((cell) => cell.replace('₱', ''));
          // Add the processed row to the CSV string
          csvData += processedRow.join(',') + '\n';
        });

        // Add a blank line to separate tables (if there are multiple tables)
        csvData += '\n';
      });
      const csvFileName = `eod_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.csv`;
      const csvFilePath = tempDir + csvFileName;

      await FileSystem.writeAsStringAsync(csvFilePath, csvData);
      setCSVData(csvData);
      setCSVFileName(csvFileName);
      setCSVFilePath(csvFilePath);
    } catch (error) {
      console.error('Error generating CSV:', error);
    }
  };

  const shareCSV = async () => {
    if (csvFilePath) {
      await Sharing.shareAsync(csvFilePath, {
        mimeType: 'application/csv',
        dialogTitle: 'Share CSV',
      });
    } else {
      console.warn('CSV file path is not available.');
    }
  };

  const saveToFiles = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      console.warn('Directory access permission is not granted.');
      return;
    }
    //create csv file and write to storage
    const csvFile = await StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      csvFileName,
      'application/csv',
    );
    await StorageAccessFramework.writeAsStringAsync(csvFile, csvData);
  };

  useEffect(() => {
    generateCSV();
  }, [data]);

  return (
    <View className="flex-row bg-white">
      <TouchableOpacity
        onPress={shareCSV}
        className="bg-green w-40 h-10 justify-center rounded-full mr-2"
      >
        <Text className="text-white text-center">
          Share CSV to Apps
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={saveToFiles}
        className="bg-green w-40 h-10 justify-center rounded-full ml-2"
      >
        <Text className="text-white text-center">
          Save CSV to Files
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareCSV;
