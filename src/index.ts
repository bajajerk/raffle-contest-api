import express from 'express';
import mongoose from 'mongoose';

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

app.use(Router);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./api/routes')(Router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
