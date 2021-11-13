import React, { Component, useState } from 'react';
import Body from './body.js';

class App extends Component {
    constructor() {
        super();

        // Bind methods
        this._loadToken = this._loadToken.bind(this);
    }

	async componentDidMount() {
        this._loadToken();
        const accessToken = localStorage.getItem('accessToken') || '';
        if (accessToken) {
            console.log('the token used is : ', accessToken);
            const res = await fetch("http://localhost:8000/api/v1/users/user/", {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const userData = await res.json();
            console.log(userData, ' is the user data recieved from django');
        }
	}

	render() {
        console.log('the local storage', window.localStorage);
		return (
			<Body />
		);
	}
    
    /**
     * Test the working of fetch request
     */
    async testFetch() {
        const url = 'http://localhost:8000/';
        const swapBase = 'https://swapi.dev/api/';
        const endpoint = `${swapBase}people/1`;
        try {
            const res = await fetch(endpoint);
            const data = await res.json();	 
            console.log(data, ' is the data received');
        } catch (error) { console.log('There was some error');}
    }
  
    /**
     * Helper to get the token
     */
    async _loadToken(){
		try {
			// Use user name and password to get the token
			// POST request with username, password and client id and secret. 
            //  curl -X POST -d "grant_type=password&username=user1&password=password" -u"koFeMjeAuKnIkas4FqJWAxPyUGKsvwzKmIRmEvnu:tP7Hjf8FkGs1uJ0GC7qDtXg8kW1MXd3Eo5kNFJsWDvMqBGnmnRauHtLFuEt9zMwnv3KPXYCKrb3egIlfVyBiRHQnNn5TjYaB04KPatB1TFKb3vBl1NXcHranuIcHUsvt" http://localhost:8000/o/token/
            //  Write the above request using fetch
            const res = fetch("http://localhost:8000/o/token/", {
              body: "grant_type=password&username=admin&password=aminara",
              headers: {
                Authorization: "Basic WmV0MFd0VmFTYkJDWWdWWjlUempXRVlld0JDRkpnTVV6NHc1V2N2bjpNWnJWWWt5M3RHZWp5Nm04eWJTNVZTbkdJWWpWNTFZbUc4MEhxY2t0dk0zQk05dHV0R280c1NZNzloWmd1TU1kbG5UeGlYQ3ZmWUlRb09lbEZYWEl6aXJIVVRqZzFnUk4xb0NjbVFmRVRVNFBtSDVoQWRVS3M4VVlQYlFzWG9Vbg==",
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST"
            })
            const tokenJson = await res.json();
            const { access_token: accessToken } = tokenJson;
            localStorage.setItem('accessToken', accessToken);
            console.log('The accesstoken received is : ', accessToken); 
		} catch (error) {
            console.log(
                'ERROR: While fetching the access token'
            );
        }
    }
}

export default App;
