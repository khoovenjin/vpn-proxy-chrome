import { requestor } from "."
import type { TIpCheckRequest } from "@/types/services/ipCheck"

export const getIpAdr = async (params: TIpCheckRequest["params"]) =>
  await requestor.get("https://icanhazip.com", params)
