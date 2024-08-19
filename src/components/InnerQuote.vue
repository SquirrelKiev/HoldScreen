<template>
  <img
    v-if="part.type === PartType.Emote"
    :src="part.url"
    class="relative inline-block max-h-[1em] min-w-[1em]"
  />
  <span
    v-else-if="part.type === PartType.Wavy"
    class="wavy"
    :style="{ animationDelay: `${index * delay}s` }"
  >
    <InnerQuote :part="part.content" :index="index" />
  </span>
  <span v-else-if="part.type === PartType.StyledText" :class="part.className" :style="{ color: part.color }">
    <InnerQuote
      :part="part.content"
      :index="part.content.index"
    />
  </span>
  <span
    v-else-if="part.type === PartType.RawText"
    class="whitespace-break-spaces"
    >{{ part.content }}</span
  >
  <InnerQuote
    v-else-if="part.type === PartType.Group"
    v-for="(innerPart) in part.content"
    :part="innerPart"
    :index="innerPart.index"
  />
</template>

<script setup lang="ts">
import { Part, PartType } from "./QuoteTypes";
const delay: number = -0.05;

defineProps<{
  part: Part;
  index: number;
}>();
</script>

<style>
.wavy {
  animation-name: wavy;
  animation-duration: 2s;
  animation-timing-function: easeInOutSine;
  animation-iteration-count: infinite;
  position: relative;
  display: inline-block;
  white-space-collapse: break-spaces;
  top: 0;
}
@keyframes wavy {
  0%,
  100% {
    top: 0.25em;
    /* transform: rotate(5deg); */
  }
  50% {
    top: -0.25em;
    /* transform: rotate(-5deg); */
  }
}
</style>
