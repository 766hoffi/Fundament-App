// Diese Funktion läuft auf dem Server (nicht im Browser des Nutzers).
// Der API-Key bleibt dadurch geheim - niemand kann ihn im Quelltext sehen.

// Eine Startauswahl an Tickern aus verschiedenen Weltregionen.
// Kann beliebig erweitert werden (jeder gültige Ticker eines
// von Financial Modeling Prep unterstützten Börsenplatzes funktioniert).
const DEFAULT_TICKERS = {
  "AAPL": "Apple",
  "MSFT": "Microsoft",
  "GOOGL": "Alphabet",
  "AMZN": "Amazon",
  "NVDA": "NVIDIA",
  "SAP.DE": "SAP",
  "SIE.DE": "Siemens",
  "ALV.DE": "Allianz",
  "BAS.DE": "BASF",
  "BMW.DE": "BMW",
  "MC.PA": "LVMH",
  "OR.PA": "L'Oréal",
  "TTE.PA": "TotalEnergies",
  "NESN.SW": "Nestlé",
  "NOVN.SW": "Novartis",
  "ROG.SW": "Roche",
  "7203.T": "Toyota",
  "6758.T": "Sony",
  "9984.T": "SoftBank Group",
  "0700.HK": "Tencent",
  "9988.HK": "Alibaba",
  "RY.TO": "Royal Bank of Canada",
  "SHOP.TO": "Shopify",
  "BHP.AX": "BHP Group",
  "CBA.AX": "Commonwealth Bank"
};

export default async function handler(req, res) {
  const apiKey = process.env.FMP_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "FMP_API_KEY ist auf dem Server nicht gesetzt." });
  }

  // Nutzer kann eigene Ticker per ?tickers=AAPL,SAP.DE übergeben,
  // sonst wird die Standardliste verwendet.
  const requestedTickers = req.query.tickers
    ? req.query.tickers.split(",").map(t => t.trim().toUpperCase())
    : Object.keys(DEFAULT_TICKERS);

  try {
    const results = await Promise.all(
      requestedTickers.map(async (symbol) => {
        try {
          const url = `https://financialmodelingprep.com/api/v3/ratios-ttm/${symbol}?apikey=${apiKey}`;
          const response = await fetch(url);
          if (!response.ok) return null;
          const data = await response.json();
          const d = data && data[0];
          if (!d) return null;

          return {
            symbol,
            name: DEFAULT_TICKERS[symbol] || symbol,
            pe: d.peRatioTTM ?? null,
            pb: d.priceToBookRatioTTM ?? null,
            de: d.debtEquityRatioTTM ?? null,
          };
        } catch {
          return null;
        }
      })
    );

    const clean = results.filter(r => r && r.pe !== null && r.pb !== null && r.de !== null);

    // Eine Stunde zwischenspeichern, um das kostenlose API-Kontingent zu schonen.
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json({ updatedAt: new Date().toISOString(), companies: clean });
  } catch (err) {
    return res.status(500).json({ error: "Datenabruf fehlgeschlagen." });
  }
}
