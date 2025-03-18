const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getAllcurrencies", async (req, res) => {
  const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=f941568a201d453e9edf9383c6077894";

  try {
    const nameResponse = await axios.get(nameURL);
    return res.json(nameResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch currency names" });
  }
});

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=f941568a201d453e9edf9383c6077894`;
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    if (!sourceRate || !targetRate) {
      return res.status(400).json({ error: "Invalid currency codes" });
    }

    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Currency conversion failed" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
