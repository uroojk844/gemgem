<script setup lang="ts">
const { data = [], editable = false } = defineProps<{
  data: string[];
  label: string;
  placeholder?: string;
  editable?: boolean;
  required?: boolean;
  name?: string;
}>();

const collapsed = ref(true);
const selected = defineModel<string>();

function toggleSelector() {
  if (!editable) return;

  collapsed.value = !collapsed.value;
}

function handleSelect(item: string) {
  selected.value = item;
  collapsed.value = true;
}

onMounted(() => {
  if (data.length == 1) {
    selected.value = data.at(0);
  }
});
</script>

<template>
  <div class="flex max-sm:flex-col w-full sm:items-center gap-2 justify-between">
    <input type="hidden" v-model="selected" :name="name || label" :required />
    <span
      class="flex-1 h-full rounded-xs flex items-center text-sm font-medium cursor-pointer"
    >
      {{ label }} <span v-if="required">&nbsp;*</span>
    </span>
    <div
      class="flex items-center flex-2 min-h-10 rounded-xs bg-white border border-gray capitalize relative max-w-sm"
    >
      <span class="px-2.5 flex-1 cursor-pointer" @click="toggleSelector">
        {{ selected || placeholder }}
      </span>
      <button type="button" class="px-2.5 h-full cursor-pointer" @click="toggleSelector">
        <img
          src="../assets/Icons/ChevronDown.svg"
          alt="Toggle"
          :class="{
            'rotate-180': !collapsed,
          }"
        />
      </button>

      <ul
        class="absolute w-full rounded-xs bg-white outline outline-gray z-10 -bottom-px left-0 translate-y-full"
        v-if="!collapsed && data.length > 1"
      >
        <li
          v-for="item in data"
          :key="item"
          @click="handleSelect(item)"
          class="h-10 flex items-center px-2 cursor-pointer hover:bg-gray-200"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
