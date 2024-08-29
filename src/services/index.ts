// Services: Serves as connection to backend's API Gateway
import { Requestor } from "./requestor"
import { SERVER_LIST } from "@/constants/country"
import { VPN } from "@/constants/server"
import type { TServerList } from "@/types/country"
import type { IServerConnection } from "@/types/server"
import type { IApiMap } from "@/types/services/base"

export const fetchConnection = async (): Promise<IServerConnection> => {
  const { ip_address, protocol, port } = VPN

  return Promise.resolve({
    serverConfig: {
      protocol,
      port,
      address: ip_address,
    },
    credentials: {
      username: "",
      password: "",
    },
  })
}

export const fetchCountry = async (): Promise<TServerList> => {
  return Promise.resolve({
    serverList: SERVER_LIST,
  })
}

export const requestor = new Requestor<IApiMap>()
