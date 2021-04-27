import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import schedule from 'node-schedule';

const app = express();
const Router = express.Router();

const dbString =
	'mongodb+srv://dbUser:dbUser@raffledb.qdmtp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbString);
mongoose.connection.on('connected', (err, conn) => {
	console.log('Mongo DB Connected');
});

mongoose.connection.on('error', err => {
	console.log('Mongo DB Connection Failed');
	process.exit(1);
});


app.use(bodyParser.json({ limit: '5mb'}));
app.use(bodyParser.urlencoded({
	limit: '5mb',
	extended: true
}));

app.use(cors())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	next();
});
app.use(Router);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./api/routes')(Router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
