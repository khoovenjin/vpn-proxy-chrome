# VPN Proxy Chrome Extension

<br>

A private vpn chrome extension built on [Wireguard](https://www.wireguard.com/) protocol & [Wireproxy](https://github.com/pufferffish/wireproxy). Step-by-step guide article at [Medium](https://medium.com/@venjink/building-a-private-vpn-chrome-extension-9a9b381f264a).

<br>

## Demo

<div style="display: flex; flex-direction: row;" align="center">
  <img src="src/assets/images/pvpn demo.gif" width="100%" />
</div>

## Features

| Feature(s)             | Description                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| Connect/Disconnect VPN | IP Mask / Masquerade your traffic packets and update your location for better anonimity. |
| Select VPN Server      | Update your default VPN server from a list of available VPN servers, before connecting.  |

## Tech-Stack

| Image                                                                                                                                                                                                                  | Name       | Role                     | Purpose                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------ | ---------------------------------------- |
| <img src="https://edent.github.io/SuperTinyIcons/images/svg/vue.svg" width="100" title="Vue">                                                                                                                          | Vue.js     | Framework                | Simplify Frontend Dev                    |
| <img src="https://edent.github.io/SuperTinyIcons/images/svg/typescript.svg" width="100" title="TypeScript">                                                                                                            | TypeScript | JS Type Syntax           | Type Safety, Static Type, Type Inference |
| <img src="https://edent.github.io/SuperTinyIcons/images/svg/sass.svg" width="100" title="Sass">                                                                                                                        | Scss       | Style Pre-processor      | Reduce CSS Repetition, Organise Styles   |
| <img src="https://edent.github.io/SuperTinyIcons/images/svg/html5.svg" width="100" title="HTML5">                                                                                                                      | Html       | Web                      | Webpage display                          |
| <img src="https://camo.githubusercontent.com/beb4deef34ad522ffbbd05a815abf5b3b1f0943b6aff9ae5c64f356335fe0b99/68747470733a2f2f70696e69612e7675656a732e6f72672f6c6f676f2e737667" width="100" title="Pinia">             | Pinia      | State Management Library | Runtime State Storage                    |
| <img src="https://camo.githubusercontent.com/2ac485b6967b7c38e2b416b2b1e3c2812a79e146eb37a74bced4305a55e282a4/68747470733a2f2f6178696f732d687474702e636f6d2f6173736574732f6c6f676f2e737667" width="100" title="Axios"> | Axios      | API                      | HTTP Client                              |
| <img src="https://user-images.githubusercontent.com/11247099/145112184-a9ff6727-661c-439d-9ada-963124a281f7.png" width="100" title="Vitest">                                                                           | Vitest     | Unit Test                | Unit Test                                |
| <img src="https://camo.githubusercontent.com/118beaba8872ecd1cc0fa048abc853d8a1717a549bd2627eade643e4a5fd66d3/68747470733a2f2f766974656a732e6465762f6c6f676f2e737667" width="100" title="Vite">                        | Vite       | Dev Server               | Frontend Build Toolbox                   |

## API(s) Used

| API           | Purpose                |
| ------------- | ---------------------- |
| icanhazip.com | GET current IP Address |
