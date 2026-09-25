<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Client } from "../types/crm";

const { t } = useI18n();

// Define a prop to accept existing client data
const props = defineProps<{
  initialData?: Partial<Client>;
}>();

// Merge default values with any initialData passed in
const formData = ref<Partial<Client>>({
  projectStatus: "working",
  paymentStatus: "unpaid",
  ...props.initialData,
});

const emit = defineEmits<{
  (e: "save", payload: Partial<Client>): void;
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
    <!-- Section: General Info -->
    <div class="mb-5">
      <h3 class="text-base font-semibold border-b pb-1 mb-3 text-gray-800">
        {{ t("client.sectionGeneral") }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.name")
          }}</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="form-input"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.taxCode")
          }}</label>
          <input
            v-model="formData.taxCode"
            type="text"
            required
            class="form-input"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.email")
          }}</label>
          <input v-model="formData.email" type="email" class="form-input" />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.phone")
          }}</label>
          <input v-model="formData.phone" type="tel" class="form-input" />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.reaNumber")
          }}</label>
          <input v-model="formData.reaNumber" type="text" class="form-input" />
        </div>

        <div class="flex flex-col">
          <!-- Empty div to keep the grid aligned if needed, or let REA span 1 col -->
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.addressOfResidence")
          }}</label>
          <input
            v-model="formData.addressOfResidence"
            type="text"
            class="form-input"
          />
        </div>

        <div class="flex flex-col md:col-span-2">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.domicileAddress")
          }}</label>
          <input
            v-model="formData.domicileAddress"
            type="text"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Group: Credentials (PEC & SPID) -->
    <div class="mb-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- Section: PEC Info -->
      <div>
        <h3 class="text-base font-semibold border-b pb-1 mb-3 text-gray-800">
          {{ t("client.sectionPec") }}
        </h3>
        <div class="flex flex-col mb-3">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.pecEmail")
          }}</label>
          <input v-model="formData.pecEmail" type="email" class="form-input" />
        </div>
        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.pecPassword")
          }}</label>
          <input
            v-model="formData.pecPassword"
            type="text"
            class="form-input"
          />
        </div>
      </div>

      <!-- Section: SPID Info -->
      <div>
        <h3 class="text-base font-semibold border-b pb-1 mb-3 text-gray-800">
          {{ t("client.sectionSpid") }}
        </h3>
        <div class="flex flex-col mb-3">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.spidUsername")
          }}</label>
          <input
            v-model="formData.spidUsername"
            type="text"
            class="form-input"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.spidPassword")
          }}</label>
          <input
            v-model="formData.spidPassword"
            type="text"
            class="form-input"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.spidOperator")
          }}</label>
          <input
            v-model="formData.spidOperator"
            type="text"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Section: Tax Agency Info -->
    <div class="mb-5">
      <h3 class="text-base font-semibold border-b pb-1 mb-3 text-gray-800">
        {{ t("client.sectionTaxAgency") }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.tinNumber")
          }}</label>
          <input v-model="formData.tinNumber" type="text" class="form-input" />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.taxAgencyPincode")
          }}</label>
          <input
            v-model="formData.taxAgencyPincode"
            type="text"
            class="form-input"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.taxAgencyPassword")
          }}</label>
          <input
            v-model="formData.taxAgencyPassword"
            type="text"
            class="form-input"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.activityCode")
          }}</label>
          <input
            v-model="formData.activityCode"
            type="text"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Section: Project Status (kept to satisfy original requirements) -->
    <div class="mb-5 bg-gray-50 p-4 rounded-md border">
      <h3 class="text-base font-semibold pb-1 mb-3 text-gray-800">
        {{ t("client.sectionProject") }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.ongoingProject")
          }}</label>
          <input
            v-model="formData.ongoingProject"
            type="text"
            class="form-input"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.projectStatus")
          }}</label>
          <select v-model="formData.projectStatus" class="form-input bg-white">
            <option value="working">{{ t("client.statusWorking") }}</option>
            <option value="finished">{{ t("client.statusFinished") }}</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.paymentStatus")
          }}</label>
          <select v-model="formData.paymentStatus" class="form-input bg-white">
            <option value="paid">{{ t("client.paid") }}</option>
            <option value="unpaid">{{ t("client.unpaid") }}</option>
          </select>
        </div>

        <div class="flex flex-col md:col-span-3 mt-1">
          <label class="text-xs font-medium text-gray-700 mb-1">{{
            t("client.adminNotes")
          }}</label>
          <textarea
            v-model="formData.adminNotes"
            rows="2"
            class="form-input"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end gap-3 mt-6">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >
        {{ t("common.cancel") }}
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
        {{ t("common.save") }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-input {
  @apply w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-shadow;
}
</style>
