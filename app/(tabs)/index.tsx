import React from 'react';
import { ScrollView, View } from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import SaleDashboard from '../../components/Home/SaleDashboard';
import CategoryGenerator from '../../components/Home/CategoryGenerator';

export default function HomeScreen() {
  
  return (

    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <ScrollView>

        <StoreInformationGenerator/>

        <DayStarter/>

        <SaleDashboard/>

        <CategoryGenerator/>

      </ScrollView>
    </View>

  );
}
