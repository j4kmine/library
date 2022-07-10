Library application, build using Adonis version 4.1.
Make sure you have `node.js >= 8.0.0` and `npm >= 3.0.0` for running backend.
Original author uses node `v14.17.3`.

### After clone

Configure the necessary configuration (copy from `.env.example`), especially database and supervisor in:

	$ .env

Run this sequentially:

	$ npm install
	$ node ace serve --watch