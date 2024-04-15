import { defineStore } from 'pinia';
import axios from "axios";
import config from '../config';

export const useArtistStore = defineStore('artist', {
  state: () => ({
    artists: [],
    isLoading: true,
    isDeleting: false,
    error: null,
    afterCreatingRoute: null
  }),

  getters: {
    getById: state => id => state.artists.find(a => a._id === id),
  },

  actions: {
    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/artists');
        this.artists = response.data;
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot load artist'
      }
    },

    async loadById(id) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/artists/' + id);
        this.artists[id] = response.data;
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot find artists!';
      }
    },

    setAfterCreatingRoute(route) {
      this.afterCreatingRoute = route;
    },

    async create(name, information, image, genres) {
      const data = {
        name: name,
        info: information,
        img: image,
        genre: genres
      }

      try {
        this.isLoading = true;
        await axios.post(config.backendUrl + '/artists/create', data);
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot add new artist';
      }
    }
  }
})
