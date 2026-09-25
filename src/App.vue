<script setup lang="ts">
import { useI18n } from "vue-i18n";

// Extract the reactive 'locale' variable from i18n
const { locale } = useI18n({ useScope: "global" });
</script>

<template>
  <!-- h-screen forces the app to take up the exact height of the native window -->
  <div
    class="flex h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden"
  >
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-10">
      <!-- App Logo / Title -->
      <div class="px-6 py-8 border-b border-gray-800">
        <h1 class="text-2xl font-bold tracking-wider text-blue-400">CRM PRO</h1>
        <p class="text-xs text-gray-400 mt-1">Gestione Studio</p>
      </div>

      <!-- Navigation Links -->

      <nav class="flex-1 px-4 py-6 space-y-2">
        <router-link
          to="/"
          class="flex items-center px-4 py-3 rounded-md transition-colors hover:bg-gray-800 text-gray-300"
          active-class="bg-blue-600 text-white font-medium shadow-md"
          exact
        >
          <svg
            class="w-5 h-5 mr-3 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          Dashboard
        </router-link>
        <router-link
          to="/clients"
          class="flex items-center px-4 py-3 rounded-md transition-colors hover:bg-gray-800 text-gray-300"
          active-class="bg-blue-600 hover:bg-blue-600 text-white font-medium shadow-md"
        >
          <!-- Clean Users Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-3 opacity-75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          Clienti
        </router-link>

        <router-link
          to="/companies"
          class="flex items-center px-4 py-3 rounded-md transition-colors hover:bg-gray-800 text-gray-300"
          active-class="bg-blue-600 hover:bg-blue-600 text-white font-medium shadow-md"
        >
          <!-- Clean Office Building Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-3 opacity-75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>
          Aziende
        </router-link>
        <div
          class="pt-4 mt-2 border-t border-gray-800 text-xs font-semibold text-gray-500 uppercase tracking-wider px-4"
        >
          Worksheets
        </div>

        <router-link
          to="/tax/clients"
          class="flex items-center px-4 py-3 rounded-md transition-colors hover:bg-gray-800 text-gray-300"
          active-class="bg-blue-600 text-white font-medium shadow-md"
        >
          <svg
            class="w-5 h-5 mr-3 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          Tax: Clienti
        </router-link>

        <router-link
          to="/tax/companies"
          class="flex items-center px-4 py-3 rounded-md transition-colors hover:bg-gray-800 text-gray-300"
          active-class="bg-blue-600 text-white font-medium shadow-md"
        >
          <svg
            class="w-5 h-5 mr-3 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          Tax: Aziende
        </router-link>
      </nav>

      <!-- Language Toggle Dropdown -->
      <div class="p-4 border-t border-gray-800 flex flex-col gap-2">
        <label
          class="text-xs text-gray-400 font-semibold uppercase tracking-wider"
          >Language / Lingua</label
        >
        <select
          v-model="locale"
          class="w-full bg-gray-800 text-sm text-gray-200 border border-gray-700 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
        >
          <option value="en">English</option>
          <option value="it">Italiano</option>
        </select>
      </div>
    </aside>

    <!-- Main Dynamic Content Area -->
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Simple fade transition for the router view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
