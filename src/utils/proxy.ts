import type { TPacExtProtocol } from "@/types/server"

/*global chrome*/

const getPacScript = (
  protocol?: TPacExtProtocol,
  address?: string,
  port?: number
) => {
  return `function FindProxyForURL(url, host) {
    return "${protocol && address && port ? `${protocol} ${address}:${port}` : "DIRECT"}"
  }`
}

export const updateChromeProxy = (
  protocol?: TPacExtProtocol,
  address?: string,
  port?: number,
  mode = "pac_script",
  scope: chrome.types.settingsScope = "regular"
): void =>
  chrome.proxy.settings.set({
    value: {
      mode,
      pacScript: {
        data: getPacScript(protocol, address, port),
      },
    },
    scope,
  })

export const getChromeProxy = (incognito = false): void =>
  chrome.proxy.settings.get({ incognito }, (config) => {
    console.log(JSON.stringify(config))
  })
