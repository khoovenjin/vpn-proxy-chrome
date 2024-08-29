import { defineStore } from "pinia"
import { DEFAULT_SERVER_LIST } from "@/constants/country"
import { fetchCountry } from "@/services"
import type { TServerList } from "@/types/country"

export const useCountry = defineStore("country", {
  state: (): {
    countries: TServerList | null
  } => ({
    countries: null,
  }),
  getters: {
    defaultCountry: (state) =>
      state.countries?.serverList.find((server) => server.isDefault) ??
      DEFAULT_SERVER_LIST,
  },
  actions: {
    async getCountries() {
      this.countries = await fetchCountry().catch((error) => {
        throw error
      })
    },
  },
})
