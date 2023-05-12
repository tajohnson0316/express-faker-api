// *** EXPRESS IMPORTS ***
const express = require("express");
const app = express();
const port = 8001;

// *** FAKER IMPORTS ***
const { faker } = require("@faker-js/faker");

// *** MIDDLEWARE ***
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createProduct = () => {
  const newFake = {
    name: faker.commerce.productName(),
    price: `$${faker.commerce.price()}`,
    department: faker.commerce.department(),
  };
  return newFake;
};

const createUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const newUser = {
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password(),
    phoneNumber: faker.phone.number("555-###-####"),
    firstName,
    lastName,
    _id: faker.string.uuid(),
  };

  return newUser;
};

const createCompany = () => {
  const newCompany = {
    name: faker.company.name(),
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    },
    _id: faker.string.uuid(),
  };

  return newCompany;
};

/* const newFakeProduct = createProduct();
const newFakeUser = createUser();
const newFakeCompany = createCompany();

console.log(newFakeProduct);
console.log(newFakeUser);
console.log(newFakeCompany); */

app.get("/api/users/new", (request, response) => {
  response.json(createUser());
});

app.get("/api/companies/new", (request, response) => {
  response.json(createCompany());
});

app.get("/api/user/company/new", (request, response) => {
  response.json([createUser(), createCompany()]);
});

// *** RUN SERVER **
app.listen(port, () => console.log(`Listening on port: ${port}`));
