import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface StockChartProps {
  symbol: string;
  apiKey: string;
}

interface AggregatedData {
  t: number; // timestamp
  c: number; // close price
}

export const StockChart: React.FC<StockChartProps> = ({ symbol, apiKey }) => {
  const [chartData, setChartData] = useState<{ labels: string[]; prices: number[]; color: string } | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2024-01-01/2024-04-30?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`
        );
        const json = await res.json();
        const results: AggregatedData[] = json.results || [];

        const labels = results.map(d => new Date(d.t).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }));
        const prices = results.map(d => d.c);

        const startPrice = prices[0];
        const endPrice = prices[prices.length - 1];
        const lineColor = endPrice >= startPrice ? '#28a745' : '#dc3545'; // green or red

        setChartData({ labels, prices, color: lineColor });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol, apiKey]);

  if (!chartData) return <ActivityIndicator size="large" color="#000" />;

  return (
    <LineChart
      data={{
        labels: chartData.labels.filter((_, i) => i % 15 === 0),
        datasets: [{ data: chartData.prices, color: () => chartData.color, strokeWidth: 3 }],
      }}
      width={screenWidth - 40}
      height={240}
      withDots={false}
      withInnerLines={false}
      withOuterLines={false}
      withShadow={false}
      yAxisLabel="$"
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => chartData.color,
        labelColor: () => '#000000',
        propsForBackgroundLines: {
          strokeWidth: 0,
        },
        propsForDots: {
          r: '0',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: chartData.color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
      }}
    />
  );
};
