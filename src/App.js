import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Forms from "./components/Forms";
import firebase from "firebase";
import uuid from "uuid/v4";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      pictures: [],
      optionSelected: "profile", // o 'all', o 'options'
      formPage: "none" // o 'sign', o 'registration'
    };

    this.handleEmailAuth = this.handleEmailAuth.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.onClick = this.onClick.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.loadUserImages = this.loadUserImages.bind(this);
    this.renderUserImages = this.renderUserImages.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user,
        optionSelected: "profile"
      });
    });

    firebase
      .database()
      .ref("pictures")
      .on("child_added", snapshot => {
        this.setState({
          pictures: this.state.pictures.concat(snapshot.val())
        });
      });
  }

  handleEmailAuth(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pw = document.getElementById("pw").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        const div = document.getElementById("message");
        div.classList.add("alert", "alert-warning");
        div.setAttribute("role", "alert");
        div.appendChild(
          document.createTextNode(`Error ${error.code}: ${error.message}`)
        );
        setTimeout(() => {
          div.classList.remove("alert", "alert-warning");
          div.setAttribute("role", "");
          div.childNodes[0].remove();
        }, 3000);
      });
  }

  createAccount(e) {
    e.preventDefault();
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const pw = document.getElementById("pw").value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then(() => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name,
          photoURL: "https://image.flaticon.com/icons/svg/747/747545.svg"
        });
        window.location.reload();
      })
      .catch(error => {
        const div = document.getElementById("message");
        div.classList.add("alert", "alert-warning");
        div.setAttribute("role", "alert");
        div.appendChild(
          document.createTextNode(`Error ${error.code}: ${error.message}`)
        );
        setTimeout(() => {
          div.classList.remove("alert", "alert-warning");
          div.setAttribute("role", "");
          div.childNodes[0].remove();
        }, 3000);
      });
  }

  changeForm(value) {
    this.setState({
      formPage: value
    });
  }

  handleGoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión!`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        console.log(`${result.user.email} ha cerrado sesión!`);
        this.setState({
          formPage: "none"
        });
      })
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const newFileName = `${uuid()}.${file.name.split(".").pop()}`;
    const storageRef = firebase.storage().ref(`fotos/${newFileName}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: percentage
        });
      },
      error => {
        console.log(error.message);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          const record = {
            userEmail: this.state.user.email,
            photoURL: this.state.user.photoURL,
            displayName: this.state.user.displayName,
            image: url
          };

          const dbRef = firebase.database().ref("pictures");
          const newPicture = dbRef.push();
          newPicture.set(record);
        });
      }
    );
  }

  onClick(e) {
    if (e.target.name === "all") {
      if (!e.target.parentElement.classList.contains("active")) {
        e.target.parentElement.classList.add("active");
        e.target.parentElement.nextSibling.classList.remove("active");
        this.setState({
          optionSelected: "all"
        });
      }
    } else if (e.target.name === "profile") {
      if (!e.target.parentElement.classList.contains("active")) {
        e.target.parentElement.classList.add("active");
        e.target.parentElement.previousSibling.classList.remove("active");
        this.setState({
          optionSelected: "profile"
        });
      }
    }
  }

  loadImages() {
    return (
      <div>
        {this.state.pictures
          .map(picture => (
            <div className="card border-primary mb-3 posts">
              <div className="card-header">
                <img
                  width="50"
                  src={picture.photoURL}
                  alt={picture.displayName}
                />
                <span> {picture.displayName}</span>
              </div>
              <div className="card-body">
                <img width="320" src={picture.image} alt="" />
              </div>
              <br />
            </div>
          ))
          .reverse()}
      </div>
    );
  }

  loadUserImages() {
    return (
      <div>
        {this.state.pictures
          .map(picture => {
            if (this.state.user.email === picture.userEmail) {
              return (
                <div className="card border-primary mb-3 posts">
                  <div className="card-header">
                    <img
                      width="50"
                      src={picture.photoURL}
                      alt={picture.displayName}
                    />
                    <span> {picture.displayName}</span>
                  </div>
                  <div className="card-body">
                    <img width="320" src={picture.image} alt="" />
                  </div>
                  <br />
                </div>
              );
            } else {
              return null;
            }
          })
          .reverse()}
      </div>
    );
  }

  renderUserImages() {
    const pics = this.loadUserImages();
    let pictureStatus = false;

    pics.props.children.forEach(pic => {
      if (pic) {
        pictureStatus = true;
      }
    });

    if (pictureStatus) {
      return <Fragment>{this.loadUserImages()}</Fragment>;
    } else {
      return (
        <Fragment>
          <br />
          <h2>This user hasn't upload pictures yet.</h2>
        </Fragment>
      );
    }
  }

  renderLoginButton() {
    //si el usuario está logueado
    if (this.state.user) {
      if (this.state.optionSelected === "profile") {
        return <div>{this.renderUserImages()}</div>;
      } else if (this.state.optionSelected === "all") {
        return <div>{this.loadImages()}</div>;
      }
    } else if (this.state.formPage !== "none") {
      return (
        <div>
          <Forms
            createAccount={this.createAccount}
            signIn={this.handleEmailAuth}
            form={this.state.formPage}
            changeForm={this.changeForm}
          />
        </div>
      );
    } else {
      //si no está logueado
      return this.loadImages();
    }
  }

  render() {
    return (
      <div className="App ">
        <Header
          user={this.state.user}
          signOut={this.handleLogout}
          logInWithEmail={this.handleEmailAuth}
          changeForm={this.changeForm}
          form={this.state.formPage}
          logInWithGoogle={this.handleGoogleAuth}
          navClick={this.onClick}
          onUpload={this.handleUpload}
          pictures={this.state.pictures}
        />

        <div className="container">{this.renderLoginButton()}</div>
      </div>
    );
  }
}

export default App;
