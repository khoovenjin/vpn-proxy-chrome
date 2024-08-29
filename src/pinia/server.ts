import { defineStore } from "pinia"
import { PAC_SCHEME } from "@/constants/server"
import { fetchConnection } from "@/services"
import { getIpAdr } from "@/services/ipCheck"
import type {
  TServerConnectionExt,
  IServerConnection,
  TConStatus,
} from "@/types/server"
import type { TIpCheckResponse } from "@/types/services/ipCheck"

export const useServer = defineStore("server", {
  state: (): {
    connections: IServerConnection | null
    status: TConStatus
    ipAddress: TIpCheckResponse | null
  } => ({
    connections: null,
    status: "Disconnected",
    ipAddress: null,
  }),
  getters: {
    connectionExt: (state): TServerConnectionExt => {
      if (!state.connections) {
        throw "Connections is null"
      }

      return {
        ...state.connections,
        serverConfig: {
          ...state.connections.serverConfig,
          protocol: PAC_SCHEME[state.connections.serverConfig.protocol],
        },
      }
    },
    connectStatus: (state) =>
      state.status === "Connected" || state.status === "Disconnecting",
    animationStatus: (state) => state.status !== "Disconnected",
    allowToggle: (state) =>
      state.status === "Connected" || state.status === "Disconnected",
  },
  actions: {
    async getConnections() {
      this.connections = await fetchConnection().catch((error) => {
        throw error
      })
    },
    async updateStatus(status: TConStatus) {
      this.status = status
    },
    async getIpAddr() {
      this.ipAddress = await getIpAdr({
        format: "json",
      })
    },
  },
})
