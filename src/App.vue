<template>
  <div class="font-quicksand font-bold text-white" spellcheck="false">
    <BlackOverlay />
    <div class="animated gradient-bg flex h-screen w-screen">
      <p class="absolute mt-4 w-full text-center text-2xl drop-shadow-md">
        have any song requests for next time?<br />
        ping me (@enonibobble) with the animethemes.moe link!<br />
        (must be from <span class="text-blue-700 underline decoration-2">animethemes.moe</span>, aka i'm only accepting OPs and EDs from
        anime for now)
      </p>
      <div class="m-auto">
        <p class="text-center text-7xl drop-shadow-md" contenteditable>
          just waiting for hidive to release the episode
        </p>
        <QuoteDisplay :emotes="emotes" :texts="texts" />
      </div>

      <MusicDisplay class="absolute bottom-0" />

      <div class="absolute bottom-0 left-0 right-0 flex justify-center">
        <img
          src="https://media.discordapp.net/stickers/1261035565122453616.png"
          class="h-48"
        />
      </div>
      <!-- <img
        src="https://media.discordapp.net/stickers/1098958701316026418.webp?size=4096"
        class="bottom-0 absolute h-20"
      /> -->
      <img
        src="https://media.discordapp.net/stickers/1098958701316026418.webp?size=4096"
        class="absolute bottom-0 right-0 h-20 scale-x-[-1]"
      />
    </div>
  </div>
</template>

<script lang="ts">
// import hotkeys from "hotkeys-js";
import QuoteDisplay from "./components/QuoteDisplay.vue";
import BlackOverlay from "./components/BlackOverlay.vue";
import MusicDisplay from "./components/MusicDisplay.vue";
import texts from "./assets/texts.json";
import emotes from "./assets/emotes.json";

export default {
  data() {
    return {
      texts: texts,
      emotes: emotes,
    };
  },
  components: {
    QuoteDisplay,
    BlackOverlay,
    MusicDisplay,
  },
};
</script>
