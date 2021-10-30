const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@travelagency.isevs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		console.log("Database connected successfully");
		const database = client.db("travel_agent");
		const serviceCollection = database.collection("services");
		const teamCollection = database.collection("teams");

		app.get("/services", async (req, res) => {
			const cursor = serviceCollection.find({});
			const services = await cursor.toArray();
			res.send(services);
		});

		app.get("/teams", async (req, res) => {
			const cursor = teamCollection.find({});
			const teams = await cursor.toArray();
			res.send(teams);
		});
	} finally {
		// await client.close()
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("This is our project server");
});

app.listen(port, () => {
	console.log("Running on port " + port);
});
