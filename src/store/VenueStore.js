import { defineStore } from 'pinia';
import axios from "axios";
import config from '../config';

export const useVenueStore = defineStore('venue', {
  state: () => ({
    venues: [],
    isLoading: true,
    isDeleting: false,
    error: null,
    afterCreatingRoute: null,
    venuesByCategory: []
  }),

  getters: {
    getById: state => id => state.venues.find(a => a._id === id),
  },

  actions: {
    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/venues');
        this.venues = response.data;
        this.venuesByCategory = [];
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot load venues'
      }
    },

    async loadById(id) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/venues/' + id);
        this.venues[id] = response.data;
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot find venue!';
      }
    },

    async loadByCategory(name) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/venues/category/' + name);
        this.venuesByCategory = response.data;
        this.error = null;
        this.isLoading = false;

      } catch (error) {
        if (error.response.status === 404) {
          this.venuesByCategory = [];
        } else {
          console.error(error);
        }
      }
    },

    setAfterCreatingRoute(route) {
      this.afterCreatingRoute = route;
    },

    async create(name, description, image, category, street, city, zip, email, web, telephone) {
      const data = {
        name: name,
        description: description,
        img: image,
        category: category,
        address: {
          street: street,
          city: city,
          zip: zip
        },
        info: {
          email: email,
          web: web,
          telephone: telephone
        }
      }

      try {
        this.isLoading = true;
        await axios.post(config.backendUrl + '/venues/create', data);
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot add new venue';
      }
    }
  }
})
