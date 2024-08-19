<template>
  <p
    class="mx-auto mt-4 flex h-[2em] justify-center text-4xl drop-shadow-md"
    :class="fadeClass"
  >
    <InnerQuote :part="currentQuote" :index="0" />
  </p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Part, PartType } from "./QuoteTypes.ts";
import InnerQuote from "./InnerQuote.vue";

const props = defineProps<{
  texts: string[];
  emotes: { [id: string]: string };
}>();

let unseenIndices = [...Array(props.texts.length).keys()];
let lastIndex = -1;

const currentIndex = ref(getRandomIndex());

const currentQuote = computed(() =>
  parseTextRoot(props.texts[currentIndex.value]),
);
const fadeClass = ref("fade-in");

function parseTextRoot(text: String): Part {
  const parts = parseText(text, { wavy: true, index: 0 });

  return { type: PartType.Group, content: parts, index: 0 };
}

function parseText(
  text: String,
  currentState: { wavy: boolean; index: number },
): Part[] {
  text = text.replace("[[textCount]]", props.texts.length.toString());

  const splits = text.split(/(:\w+:|\{\{(?:.+?)\}\})/g);
  let parts: Part[] = [];

  console.log(JSON.stringify(splits));

  splits.forEach((part) => {
    if (part.startsWith("{{") && part.endsWith("}}")) {
      const attributedTextMatch = part.match(/\{\{(.+?)\}\}/);
      if (attributedTextMatch) {
        const content = attributedTextMatch[1];
        const innerSplits = content.split(";");
        let classes: string | undefined;
        let color: string | undefined = undefined;
        let disableWavy = false;
        let rawContent: string = "";

        innerSplits.forEach((x, index) => {
          if (index == innerSplits.length - 1) {
            rawContent = x;
            return;
          }

          if (x === "?") {
            disableWavy = true;
          } else if (x.startsWith("#")) {
            color = x;
          } else if (x.trim() !== "") {
            if (classes === undefined) {
              classes = "";
            }
            classes += `${x} `;
          }
        });

          classes = classes?.trim();

        if (disableWavy) currentState.wavy = false;
        let currentContent: Part = {
          type: PartType.Group as PartType.Group,
          content: parseText(rawContent, currentState),
          index: currentState.index,
        };
        if (disableWavy) currentState.wavy = true;

        if (classes !== "" || color !== "") {
          currentContent = {
            type: PartType.StyledText as PartType.StyledText,
            className: classes,
            color: color,
            content: currentContent,
            index: currentState.index,
          };
        }

        parts.push(currentContent);
      }
    } else if (props.emotes[part]) {
      const raw = {
        type: PartType.Emote as PartType.Emote,
        url: props.emotes[part],
        index: currentState.index,
      };

      if (currentState.wavy) {
        currentState.index++;
        parts.push({
          type: PartType.Wavy as PartType.Wavy,
          content: raw,
          index: currentState.index,
        });
      } else {
        currentState.index++;
        parts.push(raw);
      }
    } else {
      if (currentState.wavy) {
        part.split("").forEach((x) => {
          const raw: Part = {
            type: PartType.RawText as PartType.RawText,
            content: x,
            index: currentState.index,
          };

          currentState.index++;
          parts.push({
            type: PartType.Wavy as PartType.Wavy,
            content: raw,
            index: currentState.index,
          });
        });
      } else {
        currentState.index++;
        parts.push({
          type: PartType.RawText as PartType.RawText,
          content: part,
          index: currentState.index,
        });
      }
    }
  });

  return parts;
}

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
