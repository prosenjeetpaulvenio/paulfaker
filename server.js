const express = require('express');
const faker = require('faker');

const app = express();


app.get('/passengers', (req, res) => {
    const { page = 1, size = 10, search = '' } = req.query;

    // Generate a list of passengers using Faker.js
    const passengers = Array.from({ length: 10000 }, () => ({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
    }));

    // Apply pagination and search filters
    const startIndex = (page - 1) * size;
    const endIndex = page * size;
    const filteredPassengers = passengers.filter((passenger) =>
        passenger.name.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedPassengers = filteredPassengers.slice(startIndex, endIndex);

    // Return the paginated passenger list
    res.json({
        total: filteredPassengers.length,
        page,
        size,
        data: paginatedPassengers,
    });
});


//start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
