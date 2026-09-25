<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import CompanyForm from "../components/CompanyForm.vue";
import { useCrm } from "../composables/useCrm";
import type { Company } from "../types/crm";

const { t } = useI18n();
const { companies, isLoading, initializeData, addCompany } = useCrm();

const isFormVisible = ref(false);
const searchQuery = ref("");

const filteredCompanies = computed(() => {
  return companies.value.filter((company) => {
    const query = searchQuery.value.toLowerCase();
    return (
      !query ||
      company.name?.toLowerCase().includes(query) ||
      company.vatNumber?.toLowerCase().includes(query) ||
      company.pecEmail?.toLowerCase().includes(query)
    );
  });
});

onMounted(async () => {
  await initializeData();
});

async function handleSaveCompany(formData: Partial<Company>) {
  try {
    const newCompany = {
      ...formData,
      id: window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : Date.now().toString(),
    } as Company;

    await addCompany(newCompany);
    isFormVisible.value = false;
  } catch (error) {
    console.error("Database Error:", error);
    alert("Errore durante il salvataggio: " + error);
  }
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Cleaned up Top Action Bar -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
    >
      <h1 class="text-2xl font-bold text-gray-800">Aziende</h1>

      <div
        v-if="!isFormVisible"
        class="flex-1 w-full flex flex-col sm:flex-row justify-end gap-3"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cerca per nome azienda, P.IVA o PEC..."
          class="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-md text-sm shadow-sm"
        />
        <button
          @click="isFormVisible = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm shadow-sm whitespace-nowrap"
        >
          + Aggiungi Azienda
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      {{ t("common.loading") }}
    </div>

    <div v-else-if="isFormVisible">
      <CompanyForm @save="handleSaveCompany" @cancel="isFormVisible = false" />
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <div
        v-if="companies.length === 0"
        class="text-center py-12 text-gray-500"
      >
        Nessuna azienda trovata. Aggiungi la tua prima azienda!
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t("company.name") }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ t("company.vatNumber") }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rappresentante Legale
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
            v-for="company in filteredCompanies"
            :key="company.id"
            class="hover:bg-gray-50"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ company.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ company.vatNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ company.legalRepName }} {{ company.legalRepSurname }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <router-link
                :to="`/companies/${company.id}`"
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
