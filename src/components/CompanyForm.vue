<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Company } from "../types/crm";

const { t } = useI18n();

// Define a prop to accept existing company data
const props = defineProps<{
  initialData?: Partial<Company>;
}>();

// Merge with any initialData passed in
const formData = ref<Partial<Company>>({
  ...props.initialData,
});

const emit = defineEmits<{
  (e: "save", payload: Partial<Company>): void;
  (e: "cancel"): void;
}>();

function submitForm() {
  emit("save", formData.value);
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg"
  >
    <!-- Company Information[cite: 2] -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
        {{ t("company.sectionCompany") }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.name")
          }}</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.vatNumber")
          }}</label>
          <input
            v-model="formData.vatNumber"
            type="text"
            required
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.taxId")
          }}</label>
          <input v-model="formData.taxId" type="text" class="form-input" />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.registeredOffice")
          }}</label>
          <input
            v-model="formData.registeredOffice"
            type="text"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1"
            >PEC Email</label
          >
          <input v-model="formData.pecEmail" type="email" class="form-input" />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1"
            >PEC Password</label
          >
          <input
            v-model="formData.pecPassword"
            type="password"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Legal Representative[cite: 2] -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
        {{ t("company.sectionLegalRep") }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            v-model="formData.legalRepName"
            type="text"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.surname")
          }}</label>
          <input
            v-model="formData.legalRepSurname"
            type="text"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.dob")
          }}</label>
          <input
            v-model="formData.legalRepDob"
            type="date"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.placeOfBirth")
          }}</label>
          <input
            v-model="formData.legalRepPlaceOfBirth"
            type="text"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Agency & Chamber of Commerce[cite: 2] -->
    <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
          {{ t("company.sectionAgency") }}
        </h3>
        <div class="flex flex-col mb-3">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.fisconelinePin")
          }}</label>
          <input
            v-model="formData.fisconelinePin"
            type="text"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.inpsRegistration")
          }}</label>
          <input
            v-model="formData.inpsRegistrationNo"
            type="text"
            class="form-input"
          />
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold border-b pb-2 mb-4 text-gray-800">
          {{ t("company.sectionChamber") }}
        </h3>
        <div class="flex flex-col mb-3">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.dateOfConstitution")
          }}</label>
          <input
            v-model="formData.dateOfConstitution"
            type="date"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700 mb-1">{{
            t("company.licenceNumber")
          }}</label>
          <input
            v-model="formData.licenceNumber"
            type="text"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 mt-6">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >
        {{ t("common.cancel") }}
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
        {{ t("common.save") }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow;
}
</style>
