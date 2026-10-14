What is pushu.ps
===

Pushu.ps is a simple tracking app for your daily pushup workout. It's main purpose was to give me a look on how to build [Svelte](http://svelte.dev) websites and learn the new thing. The app and the design itself are copyrighted but the source is open for learning purposes.

Created by [Łukasz Krysiewicz](http://secondgate.pl)



Development
===
To install the app locally you would need Node.js (version 22.12 or newer from the 22 line, or 24 which is used on GitHub Actions), npm and possibly git. Then you need to clone the repository:

	git clone https://github.com/z-x/pushu.ps.git

Next, navigate to the local repository that you've just downloaded

	cd pushu.ps

And finally install the whole thing to get all the dependencies:

	npm install


Run the development server
----
To run the dev server you just need to run

	npm run dev

It should run the server at http://localhost:8080 by default so you can just type this into your browser navigation bar and you should see the app.

When runing the server this way you are also loading the developement version of the training. This means that it will be a short training with quick breaks between sets. This allows you to test faster.

You can also build the app and serve the production version of training with

	npm run build
	npm run start

The code includes comments for easier understanding if you are looking for any particular solution. I am aware it could be better in places, but please keep in mind that this is just a side project done after hours.


Build the final package
----
To build the optimized and pure JavaScript package you need to run

	npm run build
	
The output will be placed in `dist` directory.


Production vs Developement
----
The app runs in developement mode with `npm run dev` or when it is built with the environment variable `NODE_ENV` set to `development` (as on Vercel preview deployments). It runs in production mode otherwise.

The main difference is that in `production` mode it uses a real training data while on developement mode it just uses simplified version of training.


Checking the components
----
To check all the Svelte components for errors and warnings run

	npm run check

It uses [svelte-check](https://www.npmjs.com/package/svelte-check) and runs on every pushed branch in GitHub Actions too.


Testing
----
For end to end testing I am using [Cypress](https://cypress.io). The tests are located in `cypress/e2e/test.cy.js` and `cypress/e2e/prod.cy.js`. The tests expect the app at http://localhost:8080, so first start the dev server

	npm run dev

and then, in another terminal, run

	npm run test

Cypress client will open and will let you run tests. Keep in mind that the `test.cy.js` file is written to **test the developement version of the training**. It is based on shorter breaks between sets and overall simplified version of the actual training. This is made so the test would finish faster. The `prod.cy.js` tests just if the production data was loaded and nothing more, to run it locally use the production build (`npm run build` and `npm run start`) instead of the dev server.

This project uses GitHub Actions to automatically test every branch pushed to GitHub, except `master`. The tests are runing on [Vercel](https://vercel.com) preview deployments. After each production deployment the `prod.cy.js` tests check the live site.


Tech stack
----
- [Svelte](https://svelte.dev) as a front-end framework
- [Vite](https://vite.dev) for the dev server and builds
- [svelte-check](https://www.npmjs.com/package/svelte-check) for checking the components
- [Cypress](https://cypress.io) for end to end testing
- [Vercel](https://vercel.com) for deployments
- [GitHub Actions](https://github.com/features/actions) for CI/CD
- [Photosop](https://www.adobe.com/products/photoshop.html) for the design



Where to find what
===
The `master` branch is where the current stable release sits. This is the branch that [Pushu.ps](https://pushu.ps) main website runs.



License
===
The code and the design files are opened only for learning purposes, please keep in mind that the final app and it’s design are copyrighted.