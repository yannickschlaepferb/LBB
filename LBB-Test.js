/* eslint-disable linebreak-style */
// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//const ZLICreds = { email: "some@gmail.com", password: "m295" };
//const coolCreds = { email: "literallyany@gmail.com", password: "m295"};

let TODOs = [{"id":1,"Title":"nec euismod","Creation Date":"5/4/2023","Fulfillment Date":"3/24/2023"},
	{"id":2,"Title":"lacus","Creation Date":"10/2/2022","Fulfillment Date":"10/12/2022"},
	{"id":3,"Title":"nulla nunc","Creation Date":"5/1/2023","Fulfillment Date":"10/9/2022"},
	{"id":4,"Title":"aliquam lacus morbi","Creation Date":"5/5/2023","Fulfillment Date":"12/9/2022"},
	{"id":5,"Title":"luctus rutrum","Creation Date":"5/25/2023","Fulfillment Date":"7/20/2022"},
	{"id":6,"Title":"cum sociis","Creation Date":"9/9/2022","Fulfillment Date":"11/2/2022"},
	{"id":7,"Title":"dolor vel est","Creation Date":"5/29/2023","Fulfillment Date":"1/25/2023"},
	{"id":8,"Title":"cras","Creation Date":"7/29/2022","Fulfillment Date":"8/6/2022"},
	{"id":9,"Title":"dapibus nulla suscipit","Creation Date":"10/23/2022","Fulfillment Date":"5/1/2023"},
	{"id":10,"Title":"tellus nulla","Creation Date":"11/1/2022","Fulfillment Date":"3/3/2023"}];
//generated with Mockaroo


app.get("/tasks", (req, res) => {
	res.json(TODOs);
});

app.get("/tasks/:id", (request, response) => {
	const idParams = request.params.id;
	const thisTask = TODOs.find((task) => task.id === Number(idParams));
	if (!thisTask) {
		response.sendStatus(404);
	} else {
		response.send(thisTask);
	}
});

app.post("/tasks", (request, response) => {
	const newTask = request.body;
	TODOs.push(newTask);
	response.status(201).send(newTask);
});

app.put("/tasks/:id", (request, response) => {
	const idParams = request.params.id;
	const taskChange = request.body;
	const taskIndex = TODOs.findIndex((task) => task.id === Number(idParams));    
	if (taskIndex !== -1) {
		TODOs[taskIndex] = taskChange;
		response.json(TODOs);
	} else {
		response.sendStatus(404);
	}
});


app.delete("/tasks/:id", (request, response) => {
	const idParams = request.params.id;
	const task = TODOs.find((task) => task.id === idParams);
	if (task) {
		const taskIndex = TODOs.indexOf(task);
		TODOs.splice(taskIndex, 1);
		response.json(TODOs);
	} else {
		response.sendStatus(404);
	}
});

app.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (email && password === "m295") {
		req.session.cookie = email;
		res.sendStatus(200);
	}
	else {
		res.sendStatus(401);
	}
});

app.get("/verify", (request, response,) => {
	if (request.session.cookie   ) {
		response.sendStatus(200);
	} else {
		response.sendStatus(401);
	}
});

app.delete("/logout", (req, res) => {
	req.session.destroy();
	res.sendStatus(204);
});

app.listen(port, ()=> {
	console.group(`Example app listening on port ${port}`);
});
