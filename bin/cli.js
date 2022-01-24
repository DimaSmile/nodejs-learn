#!/usr/bin/env node

import 'dotenv/config'

import got from 'got';
import { hideBin } from "yargs/helpers";

const url = process.env.ABSTRACTAPI_URL;
const apiKey = process.env.ABSTRACTAPI_API_KEY;
const [city] = hideBin(process.argv);

try {
    const data = await got(url, {
      searchParams: {
        location: city,
        api_key: apiKey
      }
    })
    .json();

    console.log(`${data.timezone_location}: ${data.datetime}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}