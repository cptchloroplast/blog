import { google } from "googleapis"
import keys from "../credentials.json" assert { type: "json" }
import fs from "fs/promises"

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const ID = process.env.GOOGLE_SHEETS_ID
const RANGE = process.env.GOOGLE_SHEETS_RANGE

async function getBikes() {
  const bikes = []
  const rows = await getSheetsData(ID, RANGE)
  for (const row of rows) {
    const key = row.shift()
    for (let i = 0; i < row.length; i++) {
      if (!bikes[i]) bikes.push({})
      bikes[i][key] = row[i]
    }
  }
  const stringified = JSON.stringify(bikes)
  await fs.writeFile("./public/bikes.json", stringified)
}

export async function getSheetsData(spreadsheetId, range) {
  const client = new google.auth.JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: SCOPES,
  })
  const sheets = google.sheets({ version: "v4", auth: client })
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  })
  return response.data.values
}

getBikes()