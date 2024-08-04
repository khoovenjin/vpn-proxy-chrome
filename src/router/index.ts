// Router: Frontend's Vue router

import {
  createRouter,
  createWebHashHistory,
  isNavigationFailure,
  NavigationFailure,
  RouteLocationRaw,
} from "vue-router"

const Home = () => import("@/views/Home.vue")

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
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
