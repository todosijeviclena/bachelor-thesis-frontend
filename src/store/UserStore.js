import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore('user', {
  state() {
    const oldToken = localStorage.getItem('token');

    if (oldToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + oldToken;
    }

    return {
      token: oldToken,
      error: null,
      isLoggingIn: false,
      loginMessage: null,
      afterLoginRoute: null,
      followedLocations: [],
      followedArtists: [],
      notifications: [],
    }
  },

  getters: {
    isAuthenticated: state => state.token !== null,
    user: state =>  jwtDecode(state.token),
  },

  actions: {
    async login(username, password) {
      try {
        this.isLoggingIn = true;

        const data = {username, password};
        const response = await axios.post(config.backendUrl + '/users/login', data);

        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        localStorage.setItem('token', this.token);

        this.error = null;
        this.loginMessage = null;
        this.isLoggingIn = false;
      } catch {
        this.isLoggingIn = false;
        this.error = 'Cannot log in, wrong password! Try again.';
      }
    },

    setLoginMessage(message) {
      this.loginMessage = message;
    },

    setAfterLoginRoute(route) {
      this.afterLoginRoute = route;
    },

    logout() {
      this.token = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    },

    clearError() {
      this.error = null;
    },

    async register(name, email, username, password){
      try {
        this.isLoggingIn = true;
        const data = {name,email,username,password};
        await axios.post(config.backendUrl + '/users/create', data);
        /*
        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        localStorage.setItem('token', this.token);*/
        this.error = null;
        this.loginMessage = null;
        this.isLoggingIn = false;

      } catch {
        this.error = 'Cannot register!';
      }
    },

    async loadUsersLocations(id) {
      try {
        let locationNames = await axios.get(config.backendUrl + '/users/locations/' + id);
        let locations = [];
        for (let i = 0; i < locationNames.data.length; i++) {
          let currentLocation = await axios.get(config.backendUrl + '/venues/name/' + locationNames.data[i]);
          if (currentLocation !== null) {
            locations.push(currentLocation.data);
          }
        }
        this.followedLocations = locations;

      } catch (error) {
        if (error.currentLocation.status === 404) {
          return null;
        } else {
          console.error(error);
        }
      }
    },

    async loadUsersArtists(id) {
      try {
        let artistNames = await axios.get(config.backendUrl + '/users/artists/' + id);
        let artists = [];
        for (let i = 0; i < artistNames.data.length; i++) {
          let currentArtist = await axios.get(config.backendUrl + '/artists/name/' + artistNames.data[i]);
          if (currentArtist !== null) {
            artists.push(currentArtist.data);
          }
        }
        this.followedArtists = artists;

      } catch (error) {
        if (error.currentArtist.status === 404) {
          return null;
        } else {
          console.error(error);
        }
      }
    },

    async followArtist(name){
      try {
        let id = jwtDecode(this.token).id;
        const data = {
          "newArtist": name
        };
        await axios.put(config.backendUrl + '/users/followArtist/' + id, data);

        this.error = null;
      } catch {
        this.error = 'Cannot follow this artist!';
      }
    },

    async followVenue(name){
      try {
        let id = jwtDecode(this.token).id;
        const data = {
          "newVenue": name
        };
        await axios.put(config.backendUrl + '/users/followVenue/' + id, data);

        this.error = null;
      } catch {
        this.error = 'Cannot follow this venue!';
      }
    },

    async unfollowArtist(name){
      try {
        let id = jwtDecode(this.token).id;
        const data = {
          "oldArtist": name
        };
        await axios.put(config.backendUrl + '/users/unfollowArtist/' + id, data);

        this.error = null;
      } catch {
        this.error = 'Cannot unfollow this artist!';
      }
    },

    async unfollowVenue(name){
      try {
        let id = jwtDecode(this.token).id;
        const data = {
          "oldVenue": name
        };
        await axios.put(config.backendUrl + '/users/unfollowVenue/' + id, data);

        this.error = null;
      } catch {
        this.error = 'Cannot unfollow this venue!';
      }
    },

    async loadNotifications(id) {
      try {
        const notifications = await axios.get(config.backendUrl + '/users/notifications/' + id);
        this.notifications = notifications.data;
        this.error = null;
      } catch {
        this.error = 'Cannot follow this artist!';
      }
    },

    async deleteNotification(text) {
      try {
        let id = jwtDecode(this.token).id;
        const data = {
          "text": text
        };
        await axios.put(config.backendUrl + '/users/deleteNotification/' + id, data);

        this.error = null;
      } catch {
        this.error = 'Cannot delete this notification!';
      }
    }
  }

})
