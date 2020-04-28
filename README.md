What is pushu.ps
=======

Pushu.ps is a simple tracking app for your daily pushups workout. It's main purpose was to give me a look on how to build [Svelte](http://svelte.dev) websites and learn the new thing. The app and the design itself are copyrighted but the source is open for learning purposes.


Development
=======
To install the app locally you would need Node.js, npm  and possibly git. Then you need to clone the repository:

	git clone https://github.com/z-x/pushu.ps.git

Next, navigate to the local repository that you've just downloaded

    cd x:/pushu.ps

And finally install the whole thing to get all the dependencies:

	npm install

Run the development server
-----------
To run the dev server you just need to run

	npm run dev

It should run the server at http://localhost:5000 by default so you can just type this into your browser navigation bar and you should see the app.

The code includes comments for easier understanding if you are looking for any particular solution. I am aware it could be better in places, but please keep in mind that this is just a side project done after hours. ;)

Build the final package
--------
To build the optimized and pure JavaScript package you need to run

	npm run build
	
The output will be placed in `public` directory.


Where to find what
=======
The `master` branch is where the current stable release sits. This is the branch that [Pushu.ps](https://pushu.ps) main website runs. Each big release gets it's own branch that is **the default GitHub branch**. So if I'm working on version 4, then the main branch would be `v4.0.0`.


License
==========
The code and the design files are opened only for learning purposes, please keep in mind that the final app and it’s design are copyrighted.