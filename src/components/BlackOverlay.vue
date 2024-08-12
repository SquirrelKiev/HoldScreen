<template>
  <div
    class="top-0 left-0 z-10 absolute bg-black w-screen h-screen"
    :class="overlayClass"
    v-if="shouldShow"
  ></div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import hotkeys from "hotkeys-js";

const shouldShow = ref(false);
const overlayClass = computed(() => shouldShow.value ? "opacity-0" : "fade-in-slow");

onMounted(() => {
  hotkeys("alt+h", (event) => {
    event.preventDefault();
    shouldShow.value = !shouldShow.value;
  });
});

onUnmounted(() => {
  hotkeys.unbind("alt+h");
});
</script>
