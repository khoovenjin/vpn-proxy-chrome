<template>
  <li class="country-item">
    <img :src="icon" alt="country" class="flag" />
    <div class="country-info">
      <span class="country-name">{{ country }}</span>
      <span class="region">{{ region }}</span>
    </div>
    <div class="radio">
      <input
        type="radio"
        :id="country"
        :value="country"
        :checked="modelValue === country"
        @change="$emit('update:modelValue', country)"
        :disabled="isDisabled"
      />
      <label :for="country"></label>
    </div>
  </li>
</template>

<script setup lang="ts">
import { DEFAULT_SERVER_LIST } from "@/constants/country"

// @todo: fix import issue
type TCountry = {
  country: string
  region: string
  icon: string
  isDefault: boolean
  modelValue: string
  isDisabled: boolean
}

withDefaults(defineProps<TCountry>(), DEFAULT_SERVER_LIST)
</script>

<style lang="scss" scoped>
@import "@/styles/main";

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

  .radio {
    @include flex-center;

    input[type="radio"] {
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

    input[type="radio"]:checked + label::after {
      display: block;
    }
  }
}
</style>
