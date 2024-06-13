const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${host}:${port}/${database}`;
    this.connection = null;

    this.connect(); // Connect to MongoDB on instantiation
  }

  async connect() {
    try {
      const client = await MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
      this.connection = client.db(); // Get default database from the client
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  isAlive() {
    return this.connection !== null;
  }

  async nbUsers() {
    try {
      const collection = this.connection.collection('users');
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      return -1; // Return -1 to indicate an error occurred
    }
  }

  async nbFiles() {
    try {
      const collection = this.connection.collection('files');
      const count = await collection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return -1; // Return -1 to indicate an error occurred
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;