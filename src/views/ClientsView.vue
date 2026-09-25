<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import ClientForm from "../components/ClientForm.vue";
import { useCrm } from "../composables/useCrm";
import type { Client } from "../types/crm";

const { t } = useI18n();
const { clients, isLoading, initializeData, addClient } = useCrm();

const isFormVisible = ref(false);

const searchQuery = ref("");
const filterProject = ref("all");
const filterPayment = ref("all");

const filteredClients = computed(() => {
  return clients.value.filter((client) => {
    const query = searchQuery.value.toLowerCase();
    const matchesSearch =
      !query ||
      client.name?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.taxCode?.toLowerCase().includes(query);

    const matchesProject =
      filterProject.value === "all" ||
      client.projectStatus === filterProject.value;
    const matchesPayment =
      filterPayment.value === "all" ||
      client.paymentStatus === filterPayment.value;

    return matchesSearch && matchesProject && matchesPayment;
  });
});

onMounted(async () => {
  await initializeData();
});

async function handleSaveClient(formData: Partial<Client>) {
  const newClient = {
    ...formData,
    id: crypto.randomUUID(),
  } as Client;

  await addClient(newClient);
  isFormVisible.value = false;
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Cleaned up Top Action Bar -->
    <div
      class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6"
    >
      <h1 class="text-2xl font-bold text-gray-800">Clienti</h1>

      <div
        v-if="!isFormVisible"
        class="flex-1 w-full flex flex-col sm:flex-row justify-end gap-3"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cerca per nome, email o CF..."
          class="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-xs text-sm shadow-sm"
        />
        <select
          v-model="filterProject"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:ring-blue-500"
        >
          <option value="all">Tutti i Progetti</option>
          <option value="working">In Lavorazione</option>
          <option value="completed">Completato</option>
        </select>
        <select
          v-model="filterPayment"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:ring-blue-500"
        >
          <option value="all">Tutti i Pagamenti</option>
          <option value="unpaid">Da Pagare</option>
          <option value="paid">Pagato</option>
        </select>
        <button
          @click="isFormVisible = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm shadow-sm whitespace-nowrap"
        >
          + Aggiungi Cliente
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      {{ t("common.loading") }}
    </div>

    <div v-else-if="isFormVisible">
      <ClientForm @save="handleSaveClient" @cancel="isFormVisible = false" />
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <div v-if="clients.length === 0" class="text-center py-12 text-gray-500">
        Nessun cliente trovato. Aggiungi il tuo primo cliente!
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t("client.name") }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email & {{ t("client.phone") }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t("client.taxCode") }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t("client.projectStatus") }}
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Azioni
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="client in filteredClients"
            :key="client.id"
            class="hover:bg-gray-50"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ client.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div>{{ client.email }}</div>
              <div class="text-xs text-gray-400">{{ client.phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ client.taxCode }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="
                  client.projectStatus === 'working'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                "
              >
                {{
                  client.projectStatus === "working"
                    ? t("client.statusWorking")
                    : t("client.statusFinished")
                }}
              </span>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <router-link
                :to="`/clients/${client.id}`"
                class="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md transition-colors"
              >
                Vedi
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
