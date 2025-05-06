import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const CHART_WIDTH = screenWidth * 0.9;
const CHART_HEIGHT = CHART_WIDTH * 0.85;
const CHART_PADDING = 20;

interface StockChartProps {
  symbol: string;
  apiKey: string;
}

interface AggregatedData {
  t: number;
  c: number;
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

        const labels = results.map(d =>
          new Date(d.t).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        );
        const prices = results.map(d => d.c);

        const startPrice = prices[0];
        const endPrice = prices[prices.length - 1];
        const lineColor = endPrice >= startPrice ? '#28a745' : '#dc3545';

        setChartData({ labels, prices, color: lineColor });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol, apiKey]);

  if (!chartData) return <ActivityIndicator size="large" color="#000" />;

  return (
    <View
      style={{
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
        backgroundColor: '#e1ece3',
        borderRadius: 20,
        padding: CHART_PADDING,
        paddingBottom:CHART_PADDING-20,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
    >
      <LineChart
        data={{
          labels: chartData.labels.filter((_, i) => i % 15 === 0),
          datasets: [
            {
              data: chartData.prices,
              color: () => chartData.color,
              strokeWidth: 3,
            },
          ],
        }}
        width={CHART_WIDTH - 2 * CHART_PADDING}
        height={CHART_HEIGHT - 2 * CHART_PADDING}
        withDots={false}
        withInnerLines={false}
        withOuterLines={true}
        withShadow={false}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e1ece3',
          backgroundGradientFrom: '#e1ece3',
          backgroundGradientTo: '#e1ece3',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForBackgroundLines: {
            stroke: '#000000',
            strokeWidth: 2,
            strokeDasharray: '', // solid lines
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};
