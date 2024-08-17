<template>
  <div
    class="absolute left-0 top-0 z-50 h-screen w-screen bg-black"
    :class="overlayClass"
  ></div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import hotkeys from "hotkeys-js";

const shouldShow = ref(false);
const overlayClass = computed(() =>
  shouldShow.value ? "fade-in-slow" : "opacity-0 pointer-events-none",
);

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
