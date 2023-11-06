const { db } = require("@vercel/postgres");

async function createUsersTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const usersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    return usersTable;
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
}

async function createCarsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const carsTable = await client.sql`
      CREATE TABLE IF NOT EXISTS cars (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        description TEXT NOT NULL,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        cost FLOAT NOT NULL
      );
    `;

    console.log(`Created "cars" table`);

    return carsTable;
  } catch (error) {
    console.error("Error creating cars table:", error);
    throw error;
  }
}

async function createClientsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const clientsTable = await client.sql`
      CREATE TABLE IF NOT EXISTS clients (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "clients" table`);

    return clientsTable;
  } catch (error) {
    console.error("Error creating clients table:", error);
    throw error;
  }
}

async function createTasksTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const tasksTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id),
        client_id UUID NOT NULL REFERENCES clients(id),
        origin_id TEXT NOT NULL,
        destination_id TEXT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        price FLOAT NOT NULL
      );
    `;

    console.log(`Created "tasks" table`);

    return tasksTable;
  } catch (error) {
    console.error("Error creating tasks table:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createUsersTable(client);
  await createCarsTable(client);
  await createClientsTable(client);
  await createTasksTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to manage the database:",
    err
  );
});
