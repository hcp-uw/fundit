import React from 'react';

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

export default function Table(props: {length: number}) {
  const [stocks, setStocks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('https://api.stock.com/stocks')
      .then((response) => response.json())
      .then((data) => {
        setStocks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // return <p>Error: {error.message}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {/* input stock element thingmabob gig */}
        {/* {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );

}