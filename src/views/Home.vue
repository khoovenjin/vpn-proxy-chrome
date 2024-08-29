<template>
  <div class="vpn">
    <section class="vpn-summary">
      <div class="map"></div>
      <div class="info">
        <h3 :class="[{ 'h3-disabled': !server.connectStatus }, 'line-space']">
          You Are {{ server.status }}
        </h3>
        <h2 :class="[{ 'h2-disabled': !server.connectStatus }, 'line-space']">
          IP:{{ server.ipAddress ?? "" }}
        </h2>
      </div>
    </section>
    <section class="vpn-content">
      <div class="action">
        <button
          @click="vpnToggle"
          :class="[
            'btn-outer',
            { 'btn-outer-disabled': !server.connectStatus },
            { 'btn-outer-cursor': !server.allowToggle },
          ]"
        >
          <div
            :class="[
              'btn-mid',
              { 'btn-mid-disabled': !server.animationStatus },
            ]"
          >
            <div class="animation" :style="loadingStyle"></div>
            <div
              :class="[
                'btn-core',
                { 'btn-core-disabled': !server.animationStatus },
              ]"
            >
              <div
                :class="
                  server.animationStatus
                    ? 'power-toggle'
                    : 'power-toggle-disabled'
                "
              ></div>
              <span
                :class="[
                  server.animationStatus
                    ? 'power-status'
                    : 'power-status-disabled',
                  'power-status-base',
                ]"
              >
                {{ server.status }}
              </span>
            </div>
          </div>
        </button>
        <h1 :class="[time ? 'duration' : 'duration-disabled', 'duration-base']">
          {{ formatTime }}
        </h1>
        <h2 class="location-title">Select Location</h2>
        <div
          @click="navigateRegion"
          :class="['server', { 'server-disabled': server.animationStatus }]"
        >
          <img class="flag" alt="country-icon" :src="defaultCountry.icon" />
          <div class="details">
            <span class="country">{{ defaultCountry.country }}</span>
            <div class="chevron-right"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useTimer } from "@/hooks/useTimer"
import { useCountry } from "@/pinia/country"
import { useServer } from "@/pinia/server"
import { updateChromeProxy } from "@/utils/proxy"

const router = useRouter()
const server = useServer()
const { defaultCountry } = useCountry()
const { toggle, time, formatTime } = useTimer()

const progress = ref(0)
const interval = ref<ReturnType<typeof setInterval> | undefined>(undefined)

const navigateRegion = () =>
  !server.animationStatus &&
  router.push({
    name: "region",
  })

const vpnToggle = () => {
  if (server.allowToggle) {
    server.updateStatus(server.connectStatus ? "Disconnecting" : "Connecting")

    progress.value = 0

    interval.value = setInterval(() => {
      progress.value += 1

      if (progress.value >= 100) {
        const { protocol, address, port } =
          server.connectionExt.serverConfig ?? {}

        progress.value = 100

        clearInterval(interval.value)

        switch (server.status) {
          case "Connecting": {
            updateChromeProxy(protocol, address, port)
            break
          }
          case "Disconnecting": {
            updateChromeProxy()
            break
          }
        }

        server.getIpAddr()

        server.updateStatus(server.connectStatus ? "Disconnected" : "Connected")

        toggle()
      }
    }, 20)
  }
}

const loadingStyle = computed(() => {
  const colors = ["transparent", "#ababab"]

  server.status === "Disconnecting" && colors.reverse()

  return {
    background: `conic-gradient(${colors[0]} ${progress.value}%, ${colors[1]} ${progress.value}%)`,
  }
})
</script>

<style lang="scss" scoped>
@import "@/styles/main";

.vpn {
  @include default-size;

  background-color: $primary-gray;
  padding-top: 0.5rem;

  &-summary {
    @include flex-center;

    height: 30%;

    .map {
      @include mask(
        "https://vpn-wireguard.s3.ap-southeast-1.amazonaws.com/images/map.svg"
      );
    }

    .info {
      @include flex-center {
        position: absolute;
        flex-direction: column;
      }

      .line-space {
        line-height: 2.4rem;
      }

      .h3-disabled {
        color: #807f81;
      }

      .h2-disabled {
        color: #5d5d5e;
      }

      h3 {
        color: $primary;
        font-size: 1.4rem;
        font-weight: 400;
      }

      h2 {
        color: $black;
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
  }

  &-content {
    @include flex-center {
      padding: 0 6rem;
    }

    .action {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      @include vpn-button(
          $outer: $secondary-gray,
          $mid: linear-gradient(45deg, $secondary, $primary),
          $core: linear-gradient(45deg, $white, $tertiary)
        )
        using ($key) {
        @if $key == outer {
          z-index: 1;
          align-self: center;
          margin-bottom: 2rem;
          cursor: pointer;

          &-disabled {
            background: #9e9c9f;
          }

          &-cursor {
            cursor: auto;
          }
        }

        @if $key == mid {
          position: relative;

          &-disabled {
            background: #ababab;
          }

          .animation {
            flex-grow: 1;
            border-radius: 50%;
          }
        }

        @if $key == core {
          position: absolute;
          flex-direction: column;
          z-index: 2;

          &-disabled {
            background: #dadada;
          }

          .power {
            &-toggle {
              @include mask(
                $image:
                  "https://vpn-wireguard.s3.ap-southeast-1.amazonaws.com/images/power-icon.svg",
                $color: $primary,
                $height: 5rem,
                $width: 5rem
              );

              &-disabled {
                @include mask(
                  $image:
                    "https://vpn-wireguard.s3.ap-southeast-1.amazonaws.com/images/power-icon.svg",
                  $color: #464646,
                  $height: 5rem,
                  $width: 5rem
                );
              }
            }

            &-status-base {
              font-weight: 400;
              line-height: 3rem;
            }

            &-status {
              color: linear-gradient(45deg, $secondary, $primary);

              &-disabled {
                color: #5f5f5f;
              }
            }
          }
        }
      }

      .duration-base {
        text-align: center;
        line-height: 4rem;
      }

      .duration {
        color: $primary;
        font-size: 1.8rem;
        font-weight: 600;

        &-disabled {
          color: #ababab;
          font-size: 1.4rem;
          font-weight: 400;
        }
      }

      .location-title {
        text-align: center;
        color: $black;
        font-size: 1.4rem;
        line-height: 3.5rem;
      }

      .server {
        @include flex-center {
          justify-content: flex-start;
          border-radius: 0.5rem;
          background-color: $white;
          padding: 1.2rem;
        }

        cursor: pointer;

        &-disabled {
          cursor: auto;
        }

        .flag {
          height: 2rem;
          aspect-ratio: 6/5;
          margin-right: 1rem;
          border: 0.1rem solid $secondary-gray;
          border-radius: 0.5rem;
        }

        .details {
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;

          .country {
            color: $black;
            font-size: 1.3rem;
          }

          .chevron-right {
            @include mask(
              $image:
                "https://vpn-wireguard.s3.ap-southeast-1.amazonaws.com/images/chevron-right.svg",
              $color: $tertiary-gray,
              $height: 2rem,
              $width: 2rem
            );
          }
        }
      }
    }
  }
}
</style>
