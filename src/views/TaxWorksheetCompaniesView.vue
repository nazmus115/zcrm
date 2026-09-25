<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCrm } from "../composables/useCrm";
import { StorageService } from "../services/storage";

const { companies, initializeData } = useCrm();
const isSaving = ref(false);

onMounted(async () => {
  if (companies.value.length === 0) {
    await initializeData();
  }
});

async function handleBulkSave() {
  isSaving.value = true;
  try {
    for (const company of companies.value) {
      await StorageService.updateCompanyTax(company);
    }
    alert("Tax Worksheet salvato con successo!");
  } catch (error) {
    console.error("Save failed:", error);
    alert("Errore durante il salvataggio.");
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <div
      class="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col"
    >
      <div
        class="bg-blue-600 px-4 py-3 flex justify-between items-center text-white"
      >
        <h2 class="text-lg font-bold flex items-center">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008z"
            />
          </svg>
          Company Tax Worksheet
        </h2>
        <button
          @click="handleBulkSave"
          :disabled="isSaving"
          class="bg-white text-blue-600 font-bold px-4 py-1.5 rounded text-sm hover:bg-gray-100 transition shadow-sm disabled:opacity-50"
        >
          {{ isSaving ? "Saving..." : "Save Changes" }}
        </button>
      </div>

      <div class="overflow-x-auto overflow-y-auto flex-1">
        <table class="min-w-full text-sm text-center border-collapse">
          <thead
            class="bg-gray-50 border-b border-gray-200 sticky top-0 z-10 shadow-sm"
          >
            <tr>
              <th
                class="px-4 py-3 text-left font-bold text-gray-900 border-r w-48 sticky left-0 bg-gray-50"
              >
                Company Name
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r">
                LIPE Q1
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r">
                LIPE Q2
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r">
                LIPE Q3
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r">
                LIPE Q4
              </th>
              <th
                class="px-2 py-3 font-bold text-gray-900 border-r bg-yellow-50"
              >
                VAT
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r bg-blue-50">
                Bal Sheet
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r bg-blue-50">
                760
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r bg-blue-50">
                IRAP
              </th>
              <th
                class="px-2 py-3 font-bold text-gray-900 border-r bg-yellow-50"
              >
                ISA
              </th>
              <th
                class="px-2 py-3 font-bold text-gray-900 border-r bg-yellow-50"
              >
                PF 740
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 border-r bg-cyan-50">
                ACCT
              </th>
              <th class="px-2 py-3 font-bold text-gray-900 bg-yellow-50">
                Done?
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="company in companies"
              :key="company.id"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td
                class="px-4 py-2 text-left font-semibold text-gray-600 border-r sticky left-0 bg-white shadow-[1px_0_0_0_#e5e7eb] truncate max-w-[200px]"
                :title="company.name"
              >
                {{ company.name }}
              </td>
              <td class="px-2 py-2 border-r">
                <input
                  type="checkbox"
                  v-model="company.lipeQ1"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r">
                <input
                  type="checkbox"
                  v-model="company.lipeQ2"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r">
                <input
                  type="checkbox"
                  v-model="company.lipeQ3"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r">
                <input
                  type="checkbox"
                  v-model="company.lipeQ4"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-yellow-50/50">
                <input
                  type="checkbox"
                  v-model="company.vat"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-blue-50/50">
                <input
                  type="checkbox"
                  v-model="company.balsheet"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-blue-50/50">
                <input
                  type="checkbox"
                  v-model="company.form760"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-blue-50/50">
                <input
                  type="checkbox"
                  v-model="company.irap"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-yellow-50/50">
                <input
                  type="checkbox"
                  v-model="company.isa"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-yellow-50/50">
                <input
                  type="checkbox"
                  v-model="company.pf740"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 border-r bg-cyan-50/50">
                <input
                  type="checkbox"
                  v-model="company.acct"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
              <td class="px-2 py-2 bg-yellow-50/50">
                <input
                  type="checkbox"
                  v-model="company.isDone"
                  class="w-4 h-4 text-blue-600 rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
