<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useCrm } from "../composables/useCrm";
import ClientForm from "../components/ClientForm.vue";
import type { Client } from "../types/crm";

// Tauri File System & Native Plugins
import { open as openDialog } from "@tauri-apps/plugin-dialog";
import { readFile, writeFile, mkdir, exists } from "@tauri-apps/plugin-fs";
import { appDataDir, join, basename } from "@tauri-apps/api/path";
import { openPath } from "@tauri-apps/plugin-opener";
import { StorageService } from "../services/storage";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { clients, initializeData, updateClient } = useCrm();

const client = ref<Client | null>(null);
const isLoading = ref(true);
const isEditing = ref(false);

onMounted(async () => {
  if (clients.value.length === 0) {
    await initializeData();
  }

  const id = route.params.id as string;
  const found = clients.value.find((c) => c.id === id);
  if (found) client.value = found;

  isLoading.value = false;
});

// Update Client Logic
async function handleUpdate(formData: Partial<Client>) {
  try {
    const updated = { ...formData, id: client.value!.id } as Client;
    await updateClient(updated);

    client.value = updated;
    isEditing.value = false;
  } catch (error) {
    console.error("Database Error:", error);
    alert("Errore durante l'aggiornamento: " + error);
  }
}

// Document Upload & Backup Logic
async function uploadDocument(
  docType: "identityCard" | "residencePermit" | "passport" | "sanitaryCard",
) {
  try {
    const selected = await openDialog({
      multiple: false,
      title: "Seleziona il documento da allegare",
    });

    if (!selected || typeof selected !== "string") return;

    const appData = await appDataDir();
    const clientFolder = await join(appData, "attachments", client.value!.id);

    const folderExists = await exists(clientFolder);
    if (!folderExists) {
      await mkdir(clientFolder, { recursive: true });
    }

    const fileName = await basename(selected);
    const destinationPath = await join(clientFolder, fileName);

    const fileData = await readFile(selected);
    await writeFile(destinationPath, fileData);

    const dbColumnMap = {
      identityCard: "identity_card_path",
      residencePermit: "residence_permit_path",
      passport: "passport_path",
      sanitaryCard: "sanitary_card_path",
    };

    await StorageService.updateClientDocument(
      client.value!.id,
      dbColumnMap[docType],
      destinationPath,
    );

    // Update local state instantly so UI refreshes
    (client.value as any)[`${docType}Path`] = destinationPath;
  } catch (error) {
    console.error("Upload Error:", error);
    alert("Errore durante il salvataggio del file: " + error);
  }
}

// Open Document Logic

async function viewDocument(path?: string) {
  if (!path) return;

  try {
    // 1. Verify the file actually successfully saved to the drive
    const fileExists = await exists(path);
    if (!fileExists) {
      alert(
        `ERRORE: Il file non è stato trovato in questo percorso:\n${path}\n\nPotrebbe non essere stato salvato correttamente.`,
      );
      return;
    }

    // 2. Attempt to open the file
    await openPath(path);
  } catch (error) {
    console.error("View Error:", error);
    // 3. Show the actual raw system error so we can debug it
    alert(`ERRORE DI SISTEMA TAURI:\n${error}`);
  }
}
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <!-- Top Action Bar -->
    <div class="flex justify-between items-center mb-6">
      <button
        @click="router.push('/clients')"
        class="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        &larr; Torna ai Clienti
      </button>

      <!-- Edit Toggle Button -->
      <button
        v-if="client && !isEditing"
        @click="isEditing = true"
        class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-sm font-medium shadow-sm"
      >
        Modifica Cliente
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      {{ t("common.loading") }}
    </div>
    <div v-else-if="!client" class="text-center py-10 text-red-500">
      Cliente non trovato.
    </div>

    <!-- The Edit Form -->
    <div v-else-if="isEditing">
      <ClientForm
        :initial-data="client"
        @save="handleUpdate"
        @cancel="isEditing = false"
      />
    </div>

    <!-- The Read-Only Data Display -->
    <div v-else class="space-y-6">
      <!-- Header -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 class="text-3xl font-bold text-gray-800">{{ client.name }}</h1>
        <p class="text-gray-500 mt-1">
          {{ client.email }} | {{ client.phone }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- General Info -->
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("client.sectionGeneral") }}
          </h3>
          <ul class="text-sm space-y-2">
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.taxCode") }}:</span
              >
              {{ client.taxCode }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.reaNumber") }}:</span
              >
              {{ client.reaNumber }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.addressOfResidence") }}:</span
              >
              {{ client.addressOfResidence }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.domicileAddress") }}:</span
              >
              {{ client.domicileAddress }}
            </li>
          </ul>
        </div>

        <!-- Tax Agency Info -->
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("client.sectionTaxAgency") }}
          </h3>
          <ul class="text-sm space-y-2">
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.tinNumber") }}:</span
              >
              {{ client.tinNumber }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.taxAgencyPincode") }}:</span
              >
              {{ client.taxAgencyPincode }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.taxAgencyPassword") }}:</span
              >
              {{ client.taxAgencyPassword }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.activityCode") }}:</span
              >
              {{ client.activityCode }}
            </li>
          </ul>
        </div>

        <!-- Credentials (PEC & SPID) -->
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            Credenziali
          </h3>
          <h4 class="font-medium text-gray-800 mt-2 text-sm">
            {{ t("client.sectionPec") }}
          </h4>
          <ul class="text-sm space-y-1 mb-3">
            <li>
              <span class="text-gray-600">Email:</span> {{ client.pecEmail }}
            </li>
            <li>
              <span class="text-gray-600">Password:</span>
              {{ client.pecPassword }}
            </li>
          </ul>
          <h4 class="font-medium text-gray-800 text-sm">
            {{ t("client.sectionSpid") }}
          </h4>
          <ul class="text-sm space-y-1">
            <li>
              <span class="text-gray-600">Username:</span>
              {{ client.spidUsername }}
            </li>
            <li>
              <span class="text-gray-600">Password:</span>
              {{ client.spidPassword }}
            </li>
            <li>
              <span class="text-gray-600">Operator:</span>
              {{ client.spidOperator }}
            </li>
          </ul>
        </div>

        <!-- Project Status -->
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("client.sectionProject") }}
          </h3>
          <ul class="text-sm space-y-2 mb-4">
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.ongoingProject") }}:</span
              >
              {{ client.ongoingProject }}
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.projectStatus") }}:</span
              >
              <span
                class="px-2 py-0.5 rounded-full text-xs font-semibold"
                :class="
                  client.projectStatus === 'working'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                "
              >
                {{ client.projectStatus }}
              </span>
            </li>
            <li>
              <span class="font-medium text-gray-600"
                >{{ t("client.paymentStatus") }}:</span
              >
              <span
                class="px-2 py-0.5 rounded-full text-xs font-semibold"
                :class="
                  client.paymentStatus === 'unpaid'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                "
              >
                {{ client.paymentStatus }}
              </span>
            </li>
          </ul>
          <h4 class="font-medium text-gray-800 text-sm border-t pt-2 mt-2">
            Note Amministratore
          </h4>
          <p
            class="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded whitespace-pre-wrap"
          >
            {{ client.adminNotes || "Nessuna nota." }}
          </p>
        </div>

        <!-- Documents Manager (Auto-Backup) -->
        <div
          class="bg-white p-5 rounded-lg shadow-sm border border-gray-200 md:col-span-2"
        >
          <h3 class="text-lg font-semibold border-b pb-2 mb-3 text-gray-800">
            {{ t("client.sectionDocuments") }} (Copie Locali)
          </h3>

          <ul class="space-y-4 max-w-2xl">
            <li
              v-for="(label, key) in {
                identityCard: 'Carta d\'Identità',
                residencePermit: 'Permesso di Soggiorno',
                passport: 'Passaporto',
                sanitaryCard: 'Tessera Sanitaria',
              }"
              :key="key"
              class="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-100"
            >
              <span class="text-sm font-medium text-gray-700">{{ label }}</span>

              <!-- Show 'Attach' if no file exists -->
              <button
                v-if="!client[`${key}Path`]"
                @click="uploadDocument(key as any)"
                class="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded font-medium transition shadow-sm"
              >
                Allega File
              </button>

              <!-- Show 'Open' if file is backed up -->
              <div v-else class="flex gap-3 items-center">
                <span
                  class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold flex items-center shadow-sm"
                >
                  <svg
                    class="w-3 h-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Salvato
                </span>
                <button
                  @click="viewDocument(client[`${key}Path`])"
                  class="text-xs bg-gray-200 text-gray-800 hover:bg-gray-300 px-3 py-1.5 rounded font-medium transition shadow-sm"
                >
                  Apri File
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
