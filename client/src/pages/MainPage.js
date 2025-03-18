import React, { useEffect, useState } from "react";
import axios from "axios";
export default function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState("0");
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState("0");
  const [currencyName,setCurrencyName]=useState ([]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });
    
      setAmountInTargetCurrency(response.data);
      console.log(amountInSourceCurrency, amountInTargetCurrency);
    } catch (err) {
      console.error("Error fetching conversion:", err);
    }
    



  };

  useEffect(()=>{

    const getCurrencyNames= async() =>{
try{
   const response = await axios.get(
    "http://localhost:5000/getAllcurrencies",
   );
   setCurrencyName(response.data);

}catch(err){
  console.error(err);
}

    }
    getCurrencyNames();
  }, [])

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert your currency today
      </h1>
      <p className="lg:mx-32 opacity-40 py-6">
        The Currency Converter Web App is a fast, user-friendly tool that allows
        users to seamlessly convert currencies in real time. Whether you're a
        traveler, business professional, or someone dealing with international
        transactions, this app provides accurate exchange rates to help you make
        informed financial decisions.
      </p>

      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-White-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date"
                name="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="sourceCurrency"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Source currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                name="sourceCurrency"
                id="sourceCurrency"
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Source currency</option>
                {Object.keys(currencyName).map((currency) =>(<option className="p-1" key={currency} value={currency}>
              {currencyName[currency]}
              </option>  
              
             ) )}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="targetCurrency"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                name="targetCurrency"
                id="targetCurrency"
                value={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
               <option value="">Target currency</option>
                {Object.keys(currencyName).map((currency) =>(<option className="p-1" key={currency} value={currency}>
              {currencyName[currency]}
              </option>  ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="amountInSourceCurrency"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Amount in Source Currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id="amountInSourceCurrency"
                name="amountInSourceCurrency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount in source currency"
              />
            </div>

            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Get the target currency
            </button>
          </form>
        </section>
      </div>
      
      <section className="lg:mx-60 mt-5 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300 " >

     {amountInSourceCurrency}.{currencyName[sourceCurrency]} is equal to 
     <span className="text-green-500">{amountInTargetCurrency}</span> in {currencyName[targetCurrency]} 
     </section>    
    </div>
  );
}
