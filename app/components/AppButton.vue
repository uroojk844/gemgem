<script setup lang="ts">
const { varient = "text" } = defineProps<{
  varient?: "filled" | "text";
}>();
</script>

<template>
  <button
    type="button"
    class="text-sm py-2.5 px-5 rounded-full flex gap-2.5 items-center cursor-pointer outline-none font-bold w-fit transition-all"
    :class="{
      'bg-black text-white hover:bg-black/80 active:scale-95':
        varient === 'filled',
      'text-black': varient === 'text',
    }"
  >
    <slot></slot>
  </button>
</template>
