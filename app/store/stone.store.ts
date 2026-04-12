import type { IFormStone } from "~/data/stoneAttributes";

export const useStoneStore = defineStore("stoneStore", () => {
  const selectedStones = ref<IFormStone[]>([]);
  const getSelectedStones = computed(() => selectedStones.value);

  function addStones(stone: IFormStone) {
    selectedStones.value.push(stone);
  }

  function removeStone(id: number) {
    selectedStones.value = selectedStones.value.filter((s) => s.id != id);
  }

  function updateStones(newStone: IFormStone) {
    selectedStones.value = selectedStones.value.map((stone) => {
      if (stone.id == newStone.id) {
        return newStone;
      } else return stone;
    });
  }

  function persist() {
    // TODO : save to local storage for later continue shopping
  }

  return {
    getSelectedStones,
    addStones,
    removeStone,
    updateStones,
  };
});
