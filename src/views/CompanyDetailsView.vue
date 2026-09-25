<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useCrm } from "../composables/useCrm";
import CompanyForm from "../components/CompanyForm.vue";
import type { Company } from "../types/crm";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { companies, initializeData, updateCompany } = useCrm();

const company = ref<Company | null>(null);
const isLoading = ref(true);
const isEditing = ref(false);

onMounted(async () => {
  if (companies.value.length === 0) {
    await initializeData();
  }

  const id = route.params.id as string;
  const found = companies.value.find((c) => c.id === id);
  if (found) company.value = found;

  isLoading.value = false;
});

async function handleUpdate(formData: Partial<Company>) {
  try {
    const updated = { ...formData, id: company.value!.id } as Company;
    await updateCompany(updated);

    company.value = updated;
    isEditing.value = false;
  } catch (error) {
    console.error("Database Error:", error);
    alert("Errore durante l'aggiornamento: " + error);
  }
}
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <!-- Top Action Bar -->
    <div class="flex justify-between items-center mb-6">
      <button
        @click="router.push('/companies')"
        class="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        &larr; Torna alle Aziende
      </button>

      <!-- Edit Toggle Button -->
      <button
        v-if="company && !isEditing"
        @click="isEditing = true"
        class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-sm font-medium shadow-sm"
      >
        Modifica Azienda
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      {{ t("common.loading") }}
    </div>
    <div v-else-if="!company" class="text-center py-10 text-red-500">
      Azienda non trovata.
    </div>

    <!-- The Edit Form -->
    <div v-else-if="isEditing">
      <CompanyForm
        :initial-data="company"
        @save="handleUpdate"
        @cancel="isEditing = false"
      />
    </div>

    <!-- Read-Only Display -->
    <div v-else class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 class="text-3xl font-bold text-gray-800">{{ company.name }}</h1>
        <p class="text-gray-500 mt-1">P.IVA / VAT: {{ company.vatNumber }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("company.sectionCompany") }}
          </h3>
          <ul class="text-sm space-y-2">
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.taxId") }}:</span
              >
              {{ company.taxId }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.registeredOffice") }}:</span
              >
              {{ company.registeredOffice }}
            </li>
            <li>
              <span class="font-medium text-gray-600">PEC Email:</span>
              {{ company.pecEmail }}
            </li>
            <li>
              <span class="font-medium text-gray-600">PEC Password:</span>
              {{ company.pecPassword }}
            </li>
          </ul>
        </div>

        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("company.sectionLegalRep") }}
          </h3>
          <ul class="text-sm space-y-2">
            <li>
              <span class="font-medium text-gray-600">Nome:</span>
              {{ company.legalRepName }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.surname") }}:</span
              >
              {{ company.legalRepSurname }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.dob") }}:</span
              >
              {{ company.legalRepDob }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.placeOfBirth") }}:</span
              >
              {{ company.legalRepPlaceOfBirth }}
            </li>
          </ul>
        </div>

        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("company.sectionAgency") }}
          </h3>
          <ul class="text-sm space-y-2">
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.fisconelinePin") }}:</span
              >
              {{ company.fisconelinePin }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.inpsRegistration") }}:</span
              >
              {{ company.inpsRegistrationNo }}
            </li>
          </ul>
        </div>

        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("company.sectionChamber") }}
          </h3>
          <ul class="text-sm space-y-2">
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.dateOfConstitution") }}:</span
              >
              {{ company.dateOfConstitution }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("company.licenceNumber") }}:</span
              >
              {{ company.licenceNumber }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
