import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen m-0 flex flex-col justify-center items-center font-bold font-mono text-lg text-white">
      <div className="text-center">
        <h1 className="font-mono font-bold text-lg sm:text-2xl pt-8">
          Crypto - CoinRanking
        </h1>
      </div>
      <div className="mt-4 text-center w-full mb-2">
        <input
          type="text"
          placeholder="Please Provide the coin.."
          className="p-2 rounded-md outline-none text-black w-3/4 sm:w-1/2 "
          value={search}
          onChange={handleChange}
        />
      </div>

      {filterCoins.map((coin, index) => (
        <div key={index} className="w-full flex flex-col mx-auto">
          <div className="mt-4 text-center flex justify-evenly w-full items-center my-2 ">
            <div className="flex gap-2">
              <img src={coin.image} alt="crypto" className="w-8 h-8" />
              <h1>{coin.id.toUpperCase()}</h1>
            </div>
            <h3>{coin.current_price}</h3>
            <h3
              className={
                coin.price_change_percentage_24h < 0
                  ? "text-red-500"
                  : "text-green-600"
              }
            >
              {coin.price_change_percentage_24h}
            </h3>
            <div>
              <h3>Mkt Cap:</h3>
              <h3>Rs.{coin.market_cap}</h3>
            </div>
          </div>
          <div className="border-b-1 border-b w-3/4 mx-auto my-2"></div>
        </div>
      ))}
    </div>
  );
};

export default App;
