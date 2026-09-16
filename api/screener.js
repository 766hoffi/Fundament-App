// Diese Funktion läuft auf dem Server (nicht im Browser des Nutzers).
// Der API-Key bleibt dadurch geheim - niemand kann ihn im Quelltext sehen.

const DEFAULT_TICKERS = {
  "AAPL": "Apple",
  "MSFT": "Microsoft",
  "GOOGL": "Alphabet",
  "AMZN": "Amazon",
  "NVDA": "NVIDIA",
  "META": "Meta",
  "TSLA": "Tesla",
  "BRK.B": "Berkshire Hathaway",
  "JPM": "JPMorgan Chase",
  "V": "Visa",
  "JNJ": "Johnson & Johnson",
  "WMT": "Walmart",
  "PG": "Procter & Gamble",
  "MA": "Mastercard",
  "HD": "Home Depot",
  "DIS": "Disney",
  "KO": "Coca-Cola",
  "PEP": "PepsiCo",
  "NFLX": "Netflix",
  "XOM": "ExxonMobil",
  "CVX": "Chevron",
  "BAC": "Bank of America",
  "PFE": "Pfizer",
  "INTC": "Intel",
  "CSCO": "Cisco",
  "VZ": "Verizon",
  "ADBE": "Adobe",
  "CRM": "Salesforce",
  "ORCL": "Oracle",
  "IBM": "IBM"
};

export default async function handler(req, res) {
  const apiKey = process.env.FMP_API_KEY
