import { ref } from "vue";
import { StorageService } from "../services/storage";
import type { Client, Company } from "../types/crm";

const clients = ref<Client[]>([]);
const companies = ref<Company[]>([]);
const isLoading = ref(false);

export function useCrm() {
  async function initializeData() {
    isLoading.value = true;
    try {
      clients.value = await StorageService.loadClients();
      companies.value = await StorageService.loadCompanies();
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addClient(client: Client) {
    await StorageService.saveClient(client);
    clients.value.push(client);
  }

  async function addCompany(company: Company) {
    await StorageService.saveCompany(company);
    companies.value.push(company);
  }

  async function updateClient(updatedClient: Client) {
    await StorageService.updateClient(updatedClient);

    // Find the old client in the array and replace it with the new data
    const index = clients.value.findIndex((c) => c.id === updatedClient.id);
    if (index !== -1) {
      clients.value[index] = updatedClient;
    }
  }

  async function updateCompany(updatedCompany: Company) {
    await StorageService.updateCompany(updatedCompany);

    const index = companies.value.findIndex((c) => c.id === updatedCompany.id);
    if (index !== -1) {
      companies.value[index] = updatedCompany;
    }
  }

  return {
    clients,
    companies,
    isLoading,
    initializeData,
    addClient,
    addCompany,
    updateClient,
    updateCompany,
  };
}
