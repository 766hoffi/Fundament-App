# Fundament — Deployment-Anleitung

Dieses Projekt besteht aus zwei Teilen:

- `public/index.html` — die Website (Landingpage + Screener), die der Besucher sieht
- `api/screener.js` — die Backend-Funktion, die den API-Key geheim hält und echte Kennzahlen abruft

## Schritt 1: Kostenlosen API-Key holen

1. Gehe auf https://site.financialmodelingprep.com/
2. Registriere dich kostenlos (Free-Plan reicht zum Start)
3. Kopiere deinen API-Key aus dem Dashboard

## Schritt 2: Bei Vercel deployen (kostenlos)

1. Gehe auf https://vercel.com und registriere dich (geht auch mit GitHub-Login)
2. Lade diesen Projektordner hoch — entweder:
   - über GitHub: Projekt in ein neues GitHub-Repo pushen, dann bei Vercel "Import Project" wählen
   - oder direkt per Vercel CLI: `npm i -g vercel` und dann im Projektordner `vercel` ausführen
3. Bei den Projekteinstellungen unter "Environment Variables" hinzufügen:
   - Name: `FMP_API_KEY`
   - Wert: dein API-Key aus Schritt 1
4. Deployen — Vercel gibt dir eine Live-URL (z.B. `fundament.vercel.app`)

## Wie es funktioniert

Der Browser lädt `index.html` und ruft `/api/screener` auf. Diese Anfrage
geht an Vercel, wo `screener.js` läuft — auf einem Server, nicht im Browser.
Erst dort wird der geheime API-Key eingesetzt und die echten Kennzahlen bei
Financial Modeling Prep abgerufen. Der Nutzer im Browser sieht den Key nie.

## Eigene Ticker

Die Startauswahl deckt große Unternehmen aus mehreren Weltregionen ab
(USA, Deutschland, Frankreich, Schweiz, Japan, Hongkong, Kanada, Australien).
Über das Eingabefeld auf der Website kann jeder Nutzer weitere Ticker
hinzufügen — jedes von Financial Modeling Prep unterstützte Symbol
funktioniert (z.B. `TSLA`, `VOW3.DE`, `005930.KS`).

## Grenzen des kostenlosen Plans

- Der Free-Plan von Financial Modeling Prep erlaubt eine begrenzte Zahl
  Anfragen pro Tag (Stand heute: 250/Tag). Das reicht zum Testen und für
  eine kleine Nutzerzahl, aber nicht für viel Traffic.
- Ein echter "Scan der ganzen Welt" (alle Börsen gleichzeitig nach
  Kennzahlen durchsuchen, ohne Ticker-Liste) braucht einen kostenpflichtigen
  Plan mit Bulk-/Screener-Endpunkten.
