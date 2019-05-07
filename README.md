# Medwing Maps App
`A react implementation of the technical exercise by Medwing`
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Design Decision
- This project uses Material-ui framework which provides the layout and consistent components used through out the App
- The project also uses a React google-maps wrapper library which provides all the helper components and methods to quickly build out the App
- Attempt is made to keep the design simple and similar to the map-ui on the google-maps developer/docs page
- Google Maps API is the primary API needed for the maps and place finder. A third party API, https://Ipapi.co, is used only when the browser doesn't support navigator object. Another third party API can be used to replace this without any challenge.
- The App is easy to use as it bears a similar resemblance in feature and behavior to the google maps found [here](https://developers.google.com/maps/documentation/geocoding/intro)
- The use of marker clusterer is one thing I find interesting, as it makes visualizing a group of markers from a small zoom camera angle, easy.

## How to install
- Setup or clone the repository [here](https://github.com/nwaughachukwuma/medwing-map-app.git)
  > if using the zip package, unzip into any directory of your choice
- Run yarn/npm install
  > The project is integrated with husky and pretty quick for cleaning up and testing pre-commits and pre-push events.
- Enter your Google maps API key.
  > I have added a Google Maps API key so you can explore the App. You can replace it with yours.
- Ensure that the server is running as the App will hit the server address on `http://localhost:8000`
- Start the App
  > with yarn/npm start
- Read on for other options

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Author
* **Chukwuma Nwaugha** - [Github](https://github.com/nwaughachukwuma)

