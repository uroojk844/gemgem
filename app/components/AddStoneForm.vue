<script setup lang="ts">
import type { IFormStone, IStone } from "~/data/stoneAttributes";
import { useStoneStore } from "~/store/stone.store";
import AppButton from "./AppButton.vue";

const { data } = defineProps<{ data: IStone }>();
const emit = defineEmits(["cancel"]);

const stoneStore = useStoneStore();
const { getSelectedStones } = storeToRefs(stoneStore);

const showForm = ref<boolean>(true);
const isUpdating = ref<boolean>(false);

// generating simple id for each stones later uuid can be used
const getId = () => new Date().getTime();

const initialValue = () => {
  let id = getId();
  return {
    id,
    category: data.category,
    stoneType: data.stoneType[0],
    shape: data.category === "diamond" ? "round" : "emerald",
    quantity: "1",
    caret: "1.5",
  } as IFormStone;
};

const formData = ref<IFormStone>({ ...initialValue() });

// function to add new stone if one stone is aleary added
function handleAddStone() {
  let id = getId();
  formData.value = {
    ...initialValue(),
    id,
  };
  showForm.value = true;
}

// cancel opened form
function handleCancel() {
  if (getSelectedData.value.length) {
    showForm.value = false;
  } else emit("cancel");
  formData.value = { ...initialValue() };
}

function handleRemove(index: number) {
  stoneStore.removeStone(index);

  if (getSelectedData.value.length == 0) emit("cancel");
}

function handleSubmit(event: SubmitEvent) {
  // updating selected stone from tile
  if (isUpdating.value) {
    stoneStore.updateStones(formData.value);
    isUpdating.value = false;
  } else {
    // Adding new gem to stone
    const form = new FormData(event.target as HTMLFormElement);
    const newStone = Object.fromEntries(form) as unknown as IFormStone;
    stoneStore.addStones({
      ...newStone,
      category: data.category,
      id: getId(),
    });
  }
  showForm.value = false;
}

const getSelectedData = computed(() =>
  getSelectedStones.value.filter((s) => s.category == data.category),
);

const getTotalQty = computed(() =>
  getSelectedData.value.reduce((cur, acc) => cur + +acc.quantity, 0),
);

// select tile to update its value with pre-filled form
function handleTileSelect(stone: IFormStone) {
  formData.value = {
    ...stone,
    quantity: stone.quantity.toString(),
    caret: stone.caret.toString(),
  };
  showForm.value = true;
  isUpdating.value = true;
}
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-1 capitalize">{{ data.category }}</h1>
    <p v-if="getSelectedData.length" class="mb-4">
      Total Qty: {{ getTotalQty }}
    </p>

    <ul class="mb-4 grid gap-2.5">
      <LazyStoneTile
        v-for="stone in getSelectedData"
        :key="stone.id"
        :stone
        @select="handleTileSelect(stone)"
        @remove="handleRemove(stone.id)"
      />
    </ul>

    <form
      v-if="showForm"
      @submit.prevent="handleSubmit"
      class="p-7.5 rounded-2xl bg-white border border-gray grid gap-5"
    >
      <LazySingleSelector
        v-model="formData.stoneType"
        :data="data.stoneType"
        label="Stone Type"
        :editable="data.isEditable"
        required
        name="stoneType"
      />
      <LazyInputField
        label="Quantity"
        type="number"
        min="1"
        v-model="formData.quantity"
        required
      />
      <LazyInputField label="Shape" v-model="formData.shape" required />
      <LazyInputField
        label="Caret"
        type="number"
        step="any"
        min="0"
        max="100"
        inputmode="decimal"
        v-model="formData.caret"
        required
      />
      <div class="flex items-center gap-2.5">
        <LazyAppButton varient="filled" type="submit">
          {{ isUpdating ? "Update" : "Save " + data.category }}
        </LazyAppButton>
        <AppButton @click="handleCancel">Cancel</AppButton>
      </div>
    </form>
    <AppButton v-else varient="filled" @click="handleAddStone">
      <img src="../assets/Icons/plus.svg" alt="add icon" class="invert" />
      <span>Add a {{ data.category }}</span>
    </AppButton>
  </section>
</template>
