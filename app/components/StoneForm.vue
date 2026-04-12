<script setup lang="ts">
import stoneAttributes from "~/data/stoneAttributes";
import { useStoneStore } from "~/store/stone.store";
const selected = ref("");
function handleSelect(id: string) {
  selected.value = id;
}

const stoneStore = useStoneStore();
const { getSelectedStones } = storeToRefs(stoneStore);

function hasStoneSelected(category: string) {
  return getSelectedStones.value.filter((s) => s.stoneType == category).length;
}
</script>

<template>
  <section
    class="p-5 grid items-start md:grid-cols-2 gap-6 md:gap-10 border border-gray rounded-md bg-white"
  >
    <template v-for="stone in stoneAttributes" :key="stone.id">
      <LazyAddStoneForm
        :data="stone"
        v-if="selected == stone.id || hasStoneSelected(stone.category)"
        @cancel="selected = ''"
      />
      <LazyStoreCard v-else :data="stone" @select="handleSelect" />
    </template>
  </section>
</template>
