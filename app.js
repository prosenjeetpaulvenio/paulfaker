const express = require('express');
const faker = require('faker');

const app = express();

// Generate 10,000+ passenger records
const generatePassengers = (count) => {
  const passengers = [];
  for (let i = 0; i < count; i++) {
    const passenger = {
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      flightNumber: faker.random.alphaNumeric(6).toUpperCase(),
    };
    passengers.push(passenger);
  }
  return passengers;
};

// Define the GET /passengers endpoint
app.get('/passengers', (req, res) => {
  const { page = 1, size = 10, search } = req.query;

  // Generate the full list of passengers
  let passengers = generatePassengers(10000);

  // Apply search filter if provided
  if (search) {
    passengers = passengers.filter((passenger) => {
      const { name, email, flightNumber } = passenger;
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase()) ||
        flightNumber.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  // Apply pagination
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const results = passengers.slice(startIndex, endIndex);

  // Send the paginated results
  res.json({
    page,
    size,
    total: passengers.length,
    data: results,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});