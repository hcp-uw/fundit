import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

/**
 * 
dynamic stock table listing stocks that can be used on home and stock search tabs
clicking on each table stack opens up stock info

take in prop of length of table
usetate va
look at length of collection
use length of collection when parsing 
len = 10
<table len 10>
<table/>

usestate
useeffect
useprops
 */

const fakeData = {
  
}

export default function Table(props: {length: number}) {
  const [stocks, setStocks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  function createTableEntry(data: any) {
    const change = ((data.c - data.o) / data.o * 100).toFixed(2); // calculate percentage change
    return (
      <View style={styles.table_row} >
        <Text style={styles.table_cell}>{data.ticker}</Text> {/* stock name */}
        <Text style={styles.table_cell}>{change}</Text> {/* stock change */}
        <Text style={styles.table_cell}>{data.results.c}</Text> {/* stock price */}
      </View>
    );

  }

  // React.useEffect(() => {
  //   functionGetStockOrWhatever() // replace with actual stock url
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setStocks(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return <Text>Error: {/*error.message*/}</Text>;
  // }

  return (
    <View style={styles.container}>
      {/* table container */}
      <View style={styles.table}>

        {/* table header */}
        <View style={styles.table_header}>
          <Text style={styles.table_header_cell}>Name</Text>
          <Text style={styles.table_header_cell}>Change</Text>
          <Text style={styles.table_header_cell}>Price</Text>
        </View>

        {/* table body */}
        <View style={styles.table_body}>

          {/* test 2 entries within the table */}
          <View style={styles.table_row}>
            <Text style={styles.table_cell}>Name</Text>
            <Text style={styles.table_cell}>Change</Text>
            <Text style={styles.table_cell}>Price</Text>
          </View>
          <View style={styles.table_row}>
            <Text style={styles.table_cell}>Name</Text>
            <Text style={styles.table_cell}>Change</Text>
            <Text style={styles.table_cell}>Price</Text>
          </View>
          {/*  */}

          {/* uncomment when stock data comes */}
          {/* {stocks.slice(0, props.length).map(createTableEntry)} */} 
        </View>

      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  table_header: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  table_header_cell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  table_body: {
    flexDirection: 'column',
  },
  table_row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  table_cell: {
    flex: 1,
    padding: 10,
  },
});