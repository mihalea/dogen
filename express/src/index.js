import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// app.use(cors({
// 	exposedHeaders: config.corsHeaders
// }));

app.use(cors());

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

app.use(bodyParser.urlencoded({
	extended: true
}));
// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});


export default app;
