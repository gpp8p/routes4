import Vue from "vue";
import VueRouter from "vue-router";

import Component1 from "../views/Component1.vue";
import Component2 from "../views/Component2.vue";
import Component3 from "../views/Component3.vue";
import Component4 from "../views/Component4.vue";
import SoftGrid1 from "../views/SoftGrid1.vue";
import editGrid from "../views/editGrid.vue";
import editGrid1 from "../views/EditGrid1.vue";
import layoutIndex from "../views/LayoutIndex.vue";
import TheNavigation from "../components/TheNavigation.vue";
import focusTest from "../views/focusTest.vue";
import testLayoutTemplate from "../views/testLayoutTemplate.vue";
import displayTemplate from "../views/displayTemplate.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: TheNavigation
  },
  {
    path: "/c1",
    name: "c1",
    component: Component1
  },
  {
    path: "/c2",
    name: "c2",
    component: Component2
  },
  {
    path: "/c3",
    name: "c3",
    component: Component3
  },
  {
    path: "/c4",
    name: "c4",
    component: Component4
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/meetings/:id&:attendeeNumber",
    name: "meetings",
    component: Component4
  },
  {
    path: "/soft",
    name: "softGrid",
    component: SoftGrid1
  },
  {
    path: "/edit",
    name: "editGrid",
    component: editGrid
  },
  {
    path: "/editLayout/:layoutId",
    name: "editLayout",
    component: editGrid1
  },
  {
    path: "/layoutIndex",
    name: "layoutIndex",
    component: layoutIndex

  },
  {
    path: "/focusTest",
    name: "focusTest",
    component: focusTest
  },
  {
    path: "/testLayoutTemplate",
    name: "testLayoutTemplate",
    component: testLayoutTemplate

  },
  {
    path: "/displayTemplate",
    name: "displayTemplate",
    component: displayTemplate,
    props: (route) => ({
      layoutId: route.query.layoutId
    })
  }

];



const router = new VueRouter({
  routes
});

export default router;
