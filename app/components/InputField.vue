<script setup lang="ts" generic="T">
const {
  editable = false,
  required = false,
  type = "text",
} = defineProps<{
  type?: string;
  label: string;
  placeholder?: string;
  editable?: boolean;
  required?: boolean;
}>();

const text = defineModel<T>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="flex max-sm:flex-col sm:items-center gap-2 justify-between">
    <label
      class="flex-1 h-full rounded-xs flex items-center text-sm font-medium cursor-pointer"
    >
      {{ label }} <span v-if="required">&nbsp;*</span>
    </label>
    <input
      :type
      v-model="text"
      :placeholder="placeholder"
      :readonly="editable"
      v-bind="$attrs"
      :name="label.toLowerCase()"
      :required
      class="flex-2 px-2.5 min-h-10 rounded-xs bg-white border border-gray capitalize outline-none sm:max-w-sm w-full"
    />
  </div>
</template>
