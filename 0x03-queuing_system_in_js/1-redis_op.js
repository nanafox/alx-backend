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
function setNewSchool(schoolName, value) {
  client.set(schoolName, value).then((res) => {
      console.log(`Reply: ${res}`);
    })
    .catch((err) => {
        console.error(`Error: ${err}`);
      },
    );
}

/**
 * Get the value of a key
 * @param schoolName
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName).then((res) => {
    console.log(res);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

// Gracefully handle the Redis client on exit
process.on('exit', () => {
  client.disconnect().then(
    () => console.log('Redis client closed'),
    (err) => console.error(`Error: ${err}`),
  );
});
