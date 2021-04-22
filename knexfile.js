// !! Update with your config settings.
require('dotenv').config();

const sharedConfig = {
	client: 'sqlite3',
	useNullAsDefault: true,
	migrations: {
		directory: './data/migrations',
	},
	seeds: {
		directory: './data/seeds',
	},
	pool: {
		afterCreate: (conn, done) => {
			conn.run('PRAGMA foreign_keys = ON', done);
		},
	},
};

module.exports = {
	development: {
		...sharedConfig,
		connection: { filename: './data/anywhereFitness.db3' },
	},
	testing: {
		...sharedConfig,
		connection: { filename: './data/testing.db3' },
	},
	production: {
		...sharedConfig,
		connection: { filename: './data/anywhereFitness.db3' },
	},
};
