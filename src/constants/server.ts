import type { TPacProtocol } from "@/types/server"

/**
 * vpn server's ip address
 */
const VPN: {
  ip_address: string
  protocol: TPacProtocol
  port: number
} = {
  ip_address: import.meta.env.VITE_IP_ADDRESS,
  protocol: "http",
  port: import.meta.env.VITE_PORT,
} as const

const PAC_SCHEME = {
  http: "PROXY",
  https: "HTTPS",
  socks4: "SOCKS",
  socks5: "SOCKS5",
} as const

export { VPN, PAC_SCHEME }
