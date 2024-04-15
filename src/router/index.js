import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EventsView from "@/views/EventsView.vue";
import VenuesView from "@/views/VenuesView.vue";
import ArtistsView from "@/views/ArtistsView.vue";
import VouchersView from "@/views/VouchersView.vue";
import VenueView from "@/views/VenueView.vue";
import EventView from "@/views/EventView.vue";
import ArtistView from "@/views/ArtistView.vue";
import AuthSection from "@/AuthSection.vue";
import UserView from "@/views/UserView.vue";
import {useUserStore} from "@/store/UserStore";
import LoginView from "@/views/LoginView.vue";
import SignInView from "@/views/SignInView.vue";
import NewVenueView from "@/views/NewVenueView.vue";
import NewEventView from "@/views/NewEventView.vue";
import NewArtistView from "@/views/NewArtistView.vue";
import BuyVoucherView from "@/views/BuyVoucherView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView
  },
  {
    path: '/events/:id',
    name: 'event-detail',
    component: EventView
  },
  {
    path: '/venues',
    name: 'venues',
    component: VenuesView
  },
  {
    path: '/venues/:id',
    name: 'venue-detail',
    component: VenueView
  },
  {
    path: '/artists',
    name: 'artists',
    component: ArtistsView
  },
  {
    path: '/artists/:id',
    name: 'artist-detail',
    component: ArtistView
  },
  {
    path: '/vouchers',
    name: 'vouchers',
    component: VouchersView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registration',
    name: 'registration',
    component: SignInView
  },
  {
    path: '/createVenue',
    name: 'createVenue',
    component: NewVenueView
  },
  {
    path: '/createEvent',
    name: 'createEvent',
    component: NewEventView
  },
  {
    path: '/createArtist',
    name: 'createArtist',
    component: NewArtistView
  },
  {
    path: '/buyVoucher',
    name: 'buyVoucher',
    component: BuyVoucherView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthSection,
    beforeEnter: checkAuthentication,
    children: [
      {
        path: '/user',
        name: 'user',
        component: UserView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

function checkAuthentication(to, from, next) {
  const store = useUserStore();
  if (store.isAuthenticated) {
    next();
  } else {
    store.setLoginMessage("Please, log in to access the private section of the web.")
    store.setAfterLoginRoute(to)
    next({name: 'login'})
  }
}

export default router
