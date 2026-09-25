<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCrm } from "../composables/useCrm";
import { useI18n } from "vue-i18n";

const { clients, companies, isLoading, initializeData } = useCrm();
const { t } = useI18n();

onMounted(async () => {
  if (clients.value.length === 0 || companies.value.length === 0) {
    await initializeData();
  }
});

// Calculate Metrics
const totalClients = computed(() => clients.value.length);
const totalCompanies = computed(() => companies.value.length);
const activeProjects = computed(
  () => clients.value.filter((c) => c.projectStatus === "working").length,
);
const unpaidClients = computed(
  () => clients.value.filter((c) => c.paymentStatus === "unpaid").length,
);
const pendingClientTaxes = computed(
  () => clients.value.filter((c) => !c.isDone).length,
);
const pendingCompanyTaxes = computed(
  () => companies.value.filter((c) => !c.isDone).length,
);
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      Caricamento dati...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Clients Stat -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center"
      >
        <div class="p-4 rounded-full bg-blue-100 text-blue-600 mr-4">
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Totale Clienti
          </p>
          <p class="text-3xl font-bold text-gray-800">{{ totalClients }}</p>
        </div>
      </div>

      <!-- Companies Stat -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center"
      >
        <div class="p-4 rounded-full bg-indigo-100 text-indigo-600 mr-4">
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Totale Aziende
          </p>
          <p class="text-3xl font-bold text-gray-800">{{ totalCompanies }}</p>
        </div>
      </div>

      <!-- Active Projects -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center"
      >
        <div class="p-4 rounded-full bg-green-100 text-green-600 mr-4">
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Progetti Attivi
          </p>
          <p class="text-3xl font-bold text-gray-800">{{ activeProjects }}</p>
        </div>
      </div>

      <!-- Unpaid Clients -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center"
      >
        <div class="p-4 rounded-full bg-red-100 text-red-600 mr-4">
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Clienti da Pagare
          </p>
          <p class="text-3xl font-bold text-red-600">{{ unpaidClients }}</p>
        </div>
      </div>

      <!-- Pending Client Taxes -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center"
      >
        <div class="p-4 rounded-full bg-yellow-100 text-yellow-600 mr-4">
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Tax Clienti In Sospeso
          </p>
          <p class="text-3xl font-bold text-gray-800">
            {{ pendingClientTaxes }}
          </p>
        </div>
      </div>

      <!-- Pending Company Taxes -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center"
      >
        <div class="p-4 rounded-full bg-yellow-100 text-yellow-600 mr-4">
          <svg
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Tax Aziende In Sospeso
          </p>
          <p class="text-3xl font-bold text-gray-800">
            {{ pendingCompanyTaxes }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
