import { TIpCheck } from "./ipCheck"

type TBaseResponse = {
  status: number
}

type IApiMap = {
  "https://icanhazip.com": TIpCheck
}
