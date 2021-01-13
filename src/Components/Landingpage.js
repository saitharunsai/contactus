import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import '../App.css'

class Landingpage extends Component {
    state = {
        redirect: null
      }
      setRedirect = () => {
        this.setState({
          redirect: "/contact"
        })
      }  
  render() {
    const responseGoogle = (response) => {
      console.log("In fail")
      console.log(response);
    };
    return (
      <div className="login">
        <h1>LOGIN</h1>
        <FacebookLogin
          appId="your app id" 
          autoLoad={false}
          fields="name,email,picture"
          callback={()=> this.props.history.push('/contact')}
        />
        <br />
        <br />

        <GoogleLogin
          clientId="your api key"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={()=> this.props.history.push('/contact')}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default Landingpage;
