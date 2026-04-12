<script setup lang="ts">
import type { IStone } from "~/data/stoneAttributes";
import AppButton from "./AppButton.vue";

defineEmits(["select"]);

defineProps<{
  data: IStone;
}>();
</script>

<template>
  <div
    v-if="data.stoneType?.length"
    class="p-7.5 rounded-2xl bg-white border border-gray grid gap-5"
  >
    <h1 class="text-xl font-bold capitalize">add {{ data.category }}</h1>
    <p class="text-xs">{{ data.description }}</p>
    <AppButton varient="filled" @click="$emit('select', data.id)">
      <img src="../assets/Icons/plus.svg" alt="add icon" class="invert" />
      <span>Add a {{ data.category }}</span>
    </AppButton>
  </div>
</template>
