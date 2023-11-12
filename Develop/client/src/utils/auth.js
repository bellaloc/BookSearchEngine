// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  constructor() {
    this.client = new ApolloClient({
      uri: '/graphql', // Change this URI to your GraphQL server endpoint
      cache: new InMemoryCache(),
    });

    this.getToken = this.getToken.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.isTokenExpired = this.isTokenExpired.bind(this);
  }

  async getProfile() {
    try {
      const response = await this.client.query({
        query: YOUR_ME_QUERY, // Define your ME query here
      });

      return response.data.me; // Update based on your GraphQL schema
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  async login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    await this.client.resetStore(); //reset the Apollo Client store to reflect login status
    window.location.assign('/');
  }

  async logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    await this.client.resetStore();//reset the Apollo Client store to reflect logout status
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
