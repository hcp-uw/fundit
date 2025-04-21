import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import getDesciption from '../../../polygonIO.mjs';

export default function Stocks() {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [stockDescription, setStockDescription] = useState<any | undefined>('');
  const [stockName, setStockName] = useState<any | undefined>('');
  const periods = ['1D', '1W', '1Y', '2Y'];

  useEffect(() => {
    // Only run once on component mount
    getStockData('AAPL');
  }, []);

  async function getStockData(ticker: String) {
    const data = await getDesciption(ticker);
    setStockDescription(data.description);
    setStockName(data.name);
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.selectorContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedButton,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.selectedText,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.infoText}>Selected period: {selectedPeriod}</Text>

      <Text style={styles.text}>About {stockName}:</Text>

      {/* Scrollable Description Box */}
      <View style={styles.descriptionWrapper}>
        <ScrollView
            style={styles.descriptionScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.stockText}>{stockDescription}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#457e59',
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#e1ece3',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  periodButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectedButton: {
    backgroundColor: '#62d089',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#232723',
  },
  selectedText: {
    color: '#232723',
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: '#e1ece3',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 30,
    padding: 10,
    color: '#e1ece3',
  },
  stockText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#232723',
  },
  descriptionWrapper: {
    backgroundColor: '#e1ece3',
    borderRadius: 10,
    height: 180,
    marginVertical: 10,
    overflow: 'hidden',
  },
  descriptionScroll: {
    flex: 1, // ← allow ScrollView to take full height of wrapper
  },  
  scrollContent: {
    padding: 10,
    paddingBottom: 10, // ← fixes clipping
  },
});
