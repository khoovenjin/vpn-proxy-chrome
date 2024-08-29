// Router: Frontend's Vue router

import {
  createRouter,
  createWebHashHistory,
  isNavigationFailure,
  NavigationFailure,
  RouteLocationRaw,
  RouteRecordRaw,
} from "vue-router"
import { useCountry } from "@/pinia/country"
import { useServer } from "@/pinia/server"

const Home = () => import("@/views/Home.vue")
const Region = () => import("@/views/Region.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    name: "home",
    beforeEnter: () => {
      Promise.allSettled([
        useCountry().getCountries(),
        useServer().getIpAddr(),
        useServer().getConnections(),
      ])
    },
  },
  {
    path: "/region",
    component: Region,
    name: "region",
    beforeEnter: async () => await useCountry().getCountries(),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Override router's behaviour to include custom error handling
const rewriteRouterPushAndReplace = (
  name: "push" | "replace",
  targetFunc: (
    to: RouteLocationRaw
  ) => Promise<void | NavigationFailure | undefined>
) => {
  router[name] = async function (location) {
    return targetFunc.call(this, location).catch((err) => {
      if (!isNavigationFailure(err)) throw err
    })
  }
}

rewriteRouterPushAndReplace("push", router.push)
rewriteRouterPushAndReplace("replace", router.replace)

export default router
