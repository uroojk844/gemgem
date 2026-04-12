<script setup lang="ts">
import type { IFormStone } from "~/data/stoneAttributes";

defineEmits(["remove", "select"]);

defineProps<{
  stone: IFormStone;
}>();
</script>
<template>
  <li
    class="flex gap-5 items-center justify-between border border-gray p-5 rounded-2xl"
  >
    <span class="capitalize cursor-pointer" @click="$emit('select')">
      {{ stone.stoneType }}, {{ stone.quantity }}qty, {{ stone.shape }},
      {{ stone.caret }}ct
    </span>
    <img
      src="../assets/Icons/x.svg"
      alt="x icon"
      class="cursor-pointer"
      @click.stop="$emit('remove')"
    />
  </li>
</template>
