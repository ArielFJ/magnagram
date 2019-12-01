import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } from "./credentials";


firebase.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
