const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createRecordViewingsApp = require('./app/record-viewings');
const createPostgresClient = require('./postgres-client');
const createMessageStore = require('./message-store');
const createHomePageAggregator = require('./aggregators/home-page');


function createConfig({env}) {
	const knexClient = createKnexClient({
		connectionString: env.databaseUrl
	});
	const postgresClient = createPostgresClient({
		connectionString: env.messageStoreConnectionString
	});
	const messageStore = createMessageStore({
		db: postgresClient
	})
	console.log('message store:', messageStore);
	const homePageAggregator = createHomePageAggregator({
		db: knexClient,
		messageStore
	})
	const aggregators = [
		homePageAggregator
	];
	const components = [];
	// const db = createKnexClient({
	// 	connectionString: env.databaseUrl
	// });
	const homeApp = createHomeApp({db: knexClient});
	const recordViewingsApp = createRecordViewingsApp({messageStore});
	return {
		homeApp,
		recordViewingsApp,
		env,
		messageStore,
		homePageAggregator,
		aggregators,
		components
	}
}

module.exports = createConfig;
