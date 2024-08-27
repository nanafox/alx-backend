#!/usr/bin/env node

import { createClient } from 'redis';

const client = createClient()
  .on('error', err => console.error(`Redis client not connected to the server: ${err}`))
  .on('connect', () => {
    console.log('Redis client connected to the server');
  });


client.connect();

/**
 * Set a new value
 * @param schoolName - key
 * @param value - value
 */
async function setNewSchool(schoolName, value) {
  const res = await client.set(schoolName, value);
  console.log(`Reply: ${res}`);
}

/**
 * Get the value of a key
 * @param schoolName
 */
async function displaySchoolValue(schoolName) {
  const data = await client.get(schoolName);
  console.log(data);
}

(async () => {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');

  // Gracefully handle the Redis client on exit
  process.on('exit', async () => {
    await client.disconnect();
    console.log('Redis client closed');
  });
})();
