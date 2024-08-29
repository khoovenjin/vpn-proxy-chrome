<template>
  <div class="region">
    <header class="header">
      <div @click="router.back" class="chevron-left"></div>
      <p>Select Country</p>
    </header>
    <div class="scrollable-pane">
      <div class="search-bar">
        <div class="search-icon"></div>
        <input type="text" placeholder="Search..." />
      </div>
      <ul class="country-list">
        <CountryListItem
          v-for="(item, index) in country.countries?.serverList"
          :key="index"
          :country="item.country"
          :region="item.region"
          :icon="item.icon"
          :is-default="item.isDefault"
          :is-disabled="country.countries?.serverList.length === 1"
          v-model="selectedCountry"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import CountryListItem from "@/components/CountryListItem.vue"
import { useCountry } from "@/pinia/country"

const router = useRouter()
const country = useCountry()

const selectedCountry = ref(country.defaultCountry.country)
</script>

<style lang="scss" scoped>
@import "@/styles/main";

.region {
  @include default-size;

  border: 0.1rem solid $secondary-gray;

  .header {
    @include flex-center {
      justify-content: flex-start;
    }

    padding: 1rem 1.5rem;
    border-bottom: 0.1rem solid $secondary-gray;

    .chevron-left {
      @include mask(
        $image:
          "https://vpn-wireguard.s3.ap-southeast-1.amazonaws.com/images/chevron-left.svg",
        $color: $tertiary-gray,
        $height: 3rem,
        $width: 3rem
      );

      z-index: 1;
      cursor: pointer;
    }

    p {
      flex-grow: 1;
      font-weight: 600;
      font-size: 1.8rem;
      color: $tertiary-gray;
      text-align: center;
    }
  }

  .scrollable-pane {
    @include scrollbar($radius: 0.3rem);

    height: auto;
    max-height: calc(100vh - 0.8rem);
    overflow-y: auto;

    .search {
      &-bar {
        @include flex-center;

        border: 0.1rem solid $secondary-gray;
        border-radius: 0.5rem;
        padding: 0.8rem 1rem;
        margin: 1rem 1.5rem;

        input {
          border: none;
          outline: none;
          background: transparent;
          flex-grow: 1;
          color: $secondary-gray;
          font-size: 1.6rem;
          cursor: text;

          &::placeholder {
            color: $secondary-gray;
          }
        }
      }

      &-icon {
        @include mask(
          $image:
            "https://vpn-wireguard.s3.ap-southeast-1.amazonaws.com/images/search-icon.svg",
          $color: $secondary-gray,
          $height: 1.5rem,
          $width: 1.5rem
        );

        margin-right: 0.8rem;
      }
    }

    .country-list {
      .country-item {
        @include flex-center;

        padding: 1rem 1.5rem;
        border-bottom: 0.1rem solid $secondary-gray;
        border-top: 0.1rem solid $secondary-gray;

        .flag {
          @include circle(3.2rem);

          border: 0.1rem solid $secondary-gray;
          margin-right: 1.2rem;
        }

        .country-info {
          flex-grow: 1;

          .country-name {
            display: block;
            color: $black;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .region {
            font-size: 1.2rem;
            color: $tertiary-gray;
            border: none;
          }
        }

        .checkbox {
          @include flex-center;

          input[type="checkbox"] {
            display: none;
          }

          label {
            @include flex-center;
            @include circle(2.4rem);

            border: 0.1rem solid $primary-blue;
            cursor: pointer;

            &::after {
              @include circle(1.2rem);

              content: "";
              background: $primary-blue;
              display: none;
            }
          }

          input[type="checkbox"]:checked + label::after {
            display: block;
          }
        }
      }
    }
  }
}
</style>
