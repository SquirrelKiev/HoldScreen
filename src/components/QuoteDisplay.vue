<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineProps } from "vue";

const props = defineProps<{
  texts: string[];
  emotes: { [id: string]: string };
}>();

let unseenIndices = [...Array(props.texts.length).keys()];
let lastIndex = -1;

const delay: number = -0.05;
const currentIndex = ref(getRandomIndex());

const currentQuote = computed(() => parseText(props.texts[currentIndex.value]));
const fadeClass = ref("fade-in");

const parseText = (text: String) => {
  text = text.replace("{textCount}", props.texts.length.toString());

  const splits = text.split(/(:\w+:)/g);
  let parts: { isEmote: boolean; content: string }[] = [];

  splits.forEach((part) => {
    if (props.emotes[part]) {
      parts.push({ isEmote: true, content: props.emotes[part] });
    } else {
      part.split("").forEach((x) => {
        parts.push({ isEmote: false, content: x });
      });
    }
  });

  return parts;
};

function getRandomIndex(): number {
  if (unseenIndices.length === 0) {
    unseenIndices = [...Array(props.texts.length).keys()]; // we've seen every quote, reset
  }
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * unseenIndices.length);
  } while (
    unseenIndices[randomIndex] === lastIndex &&
    unseenIndices.length > 1
  );

  return unseenIndices.splice(randomIndex, 1)[0];
}

onMounted(() => {
  const interval = setInterval(() => {
    fadeClass.value = "fade-out";

    setTimeout(() => {
      currentIndex.value = getRandomIndex();
      fadeClass.value = "fade-in";
    }, 750);
  }, 15000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <p
    class="flex justify-center drop-shadow-md mx-auto mt-4 h-[2em] text-4xl"
    :class="fadeClass"
  >
    <template v-for="(part, index) in currentQuote" :key="{currentIndex, index}">
      <img
        v-if="part.isEmote"
        :src="part.content"
        class="emote wavy"
        :style="{ animationDelay: `${index * delay}s` }"
      />
      <span
        v-else
        class="wavy"
        :style="{ animationDelay: `${index * delay}s` }"
      >
        {{ part.content }}
      </span>
    </template>
  </p>
</template>
