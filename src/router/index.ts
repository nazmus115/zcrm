// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import ClientsView from "../views/ClientsView.vue";

const router = createRouter({
  // Tauri serves files from a custom protocol (tauri://), and createWebHistory works perfectly with Vite.
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/clients",
      name: "clients",
      component: ClientsView,
    },
    {
      path: "/clients/:id",
      name: "client-details",
      component: () => import("../views/ClientDetailsView.vue"),
    },
    {
      path: "/companies",
      name: "companies",
      // Lazy loaded view for the upcoming company data[cite: 2]
      component: () => import("../views/CompaniesView.vue"),
    },
    {
      path: "/companies/:id",
      name: "company-details",
      component: () => import("../views/CompanyDetailsView.vue"),
    },
    {
      path: "/tax/clients",
      name: "tax-clients",
      component: () => import("../views/TaxWorksheetClientsView.vue"),
    },
    {
      path: "/tax/companies",
      name: "tax-companies",
      component: () => import("../views/TaxWorksheetCompaniesView.vue"),
    },
  ],
});

export default router;
