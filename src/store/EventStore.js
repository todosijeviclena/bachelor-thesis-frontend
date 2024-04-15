import {defineStore} from 'pinia';
import axios from "axios";
import config from '../config';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
    isLoading: true,
    isDeleting: false,
    error: null,
    eventsByLocation: [],
    eventsByArtist: [],
    todayEvents: [],
    tomorrowEvents: [],
    eventsByCategory: [],
    afterCreatingRoute: null,
    popularEvents: [],
    newest: null,
  }),

  getters: {
    getById: state => id => state.events.find(a => a._id === id),
  },

  actions: {
    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events');
        this.events = response.data;
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot load events'
      }
    },

    async loadToday() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/today/events/');
        this.todayEvents = response.data;
        this.error = null;
        this.isLoading = false;
      } catch (error) {
        if (error.response.status === 404) {
          this.todayEvents = [];
        } else {
          console.error(error);
        }
      }
    },

    async loadTomorrow() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/tomorrow/events/');
        this.tomorrowEvents = response.data;
        this.error = null;
        this.isLoading = false;
      } catch (error) {
        if (error.response.status === 404) {
          this.tomorrowEvents = [];
        } else {
          console.error(error);
        }
      }
    },

    async loadPopular() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/popular/top');
        this.popularEvents = response.data;
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot load popular events'
      }
    },

    async loadNewest() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/last/added');
        this.newest = response.data;
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot newest event'
      }
    },

    async loadById(id) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/' + id);
        this.events[id] = response.data;
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot find event!';
      }
    },

    async loadByLocation(name) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/location/' + name);
        this.eventsByLocation = response.data;
        this.error = null;
        this.isLoading = false;

      } catch (error) {
        if (error.response.status === 404) {
          this.eventsByLocation = [];
        } else {
          console.error(error);
        }
      }
    },

    async loadByArtist(name) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/artist/' + name);
        this.eventsByArtist = response.data;
        this.error = null;
        this.isLoading = false;

      } catch (error) {
        if (error.response.status === 404) {
          this.eventsByArtist = [];
        } else {
          console.error(error);
        }
      }
    },

    async loadByCategory(name) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/events/category/' + name);
        this.eventsByCategory = response.data;
        this.error = null;
        this.isLoading = false;

      } catch (error) {
        if (error.response.status === 404) {
          this.eventsByCategory = [];
        } else {
          console.error(error);
        }
      }
    },

    setAfterCreatingRoute(route) {
      this.afterCreatingRoute = route;
    },

    async create(name, description, image, category, capacity, price, date, duration, artist, event_location) {
      const data = {
        name: name,
        description: description,
        img: image,
        category: category,
        capacity: capacity,
        price: {
          standard: price
        },
        dateTime: date,
        duration: duration,
        artist: artist,
        location: event_location
      }

      try {
        this.isLoading = true;
        await axios.post(config.backendUrl + '/events/create', data);
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot add new venue';
      }
    }
  }
})
