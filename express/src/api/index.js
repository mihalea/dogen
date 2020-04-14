import { version } from '../../package.json';
import { Router } from 'express';
import document from './document';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/document', document({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
