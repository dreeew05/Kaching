import React from 'react';
import { ScrollView, View } from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import SaleDashboard from '../../components/Home/SaleDashboard';
import CategoryGenerator from '../../components/Home/CategoryGenerator';
import { Provider, useDispatch } from 'react-redux';
import { Store } from '../../redux/Store';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { setIsEditComponent } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { useEffect, useState } from 'react';



export default function HomeScreen() {
  
  // Hide/Show start day pressable
  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <ScrollView>
          <StoreInformationGenerator />

          <DayStarter />
  
          <CategoryGenerator />
        </ScrollView>
      </View>
    </Provider>
  );
}
