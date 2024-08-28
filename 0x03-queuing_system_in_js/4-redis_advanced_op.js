import { createClient } from 'redis';

const key = 'HolbertonSchools';


const client = createClient()
  .on('error', err => console.error(`Redis client not connected to the server: ${err}`))
  .on('connect', () => {
    console.log('Redis client connected to the server');
  });

client.connect();

/**
 * Sets value in a Redis hash
 */
function createHash() {
  const schools = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };

  for (const [city, value] of Object.entries(schools)) {
    client.hSet(key, city, value)
      .then(() => console.log(`Reply: 1`))
      .catch(err => console.error(`Error setting value for ${city}: ${err}`));
  }
}

/**
 * Displays the value of a given field in a Redis hash
 */
function displayHash() {
  client.hGetAll(key)
    .then(object => console.log(object))
    .catch(err => console.error(`Error fetching hash: ${err}`));
}

createHash();
displayHash();
