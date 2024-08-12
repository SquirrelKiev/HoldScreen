<template>
  <div class="font-bold font-quicksand text-white" spellcheck="false">
    <BlackOverlay />
    <div class="flex w-screen h-screen animated gradient-bg">
      <div class="m-auto">
        <p
          class="drop-shadow-md text-7xl text-center"
          contenteditable
        >
          just waiting for hidive to release the episode
        </p>
        <QuoteDisplay :emotes="emotes" :texts="texts"/>
      </div>
      
      <div class="right-0 bottom-0 left-0 absolute flex justify-center mb-20">
        <img
          src="https://cdn.discordapp.com/emojis/1231502178280280124.gif?size=128&quality=lossless"
          class="h-24"
        />
      </div>
      <img
        src="https://media.discordapp.net/stickers/1098958701316026418.webp?size=4096"
        class="bottom-0 absolute h-20"
      />
      <img
        src="https://media.discordapp.net/stickers/1098958701316026418.webp?size=4096"
        class="right-0 bottom-0 absolute h-20 scale-x-[-1]"
      />
    </div>
  </div>
</template>

<script lang="ts">
// import hotkeys from "hotkeys-js";
import QuoteDisplay from "./components/QuoteDisplay.vue";
import BlackOverlay from "./components/BlackOverlay.vue";
import texts from './assets/texts.json';
import emotes from './assets/emotes.json';

export default {
  data(){
    return {
      texts: texts,
      emotes: emotes
    }
  },
  components: {
    QuoteDisplay,
    BlackOverlay
  },
};
</script>
