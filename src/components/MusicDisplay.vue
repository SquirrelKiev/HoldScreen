<template>
  <div class="m-4 flex items-center">
    <div class="h-20 w-20">
      <div
        class="loading-bg absolute left-[-0.25rem] top-[-0.25rem] z-0 h-[5.5rem] w-[5.5rem] rounded-lg drop-shadow-md"
      ></div>
      <img
        :src="currentSongArt"
        class="relative z-10 rounded-md"
        @click="resetCurrentSong"
      />
    </div>
    <div class="ml-2 h-fit">
      <p class="text-2xl drop-shadow-md" id="music-title" @click="nextSong">
        {{ currentSong.title }}
      </p>
      <p class="text-xl font-semibold drop-shadow-md">
        by <b>{{ currentSong.artist }}</b>
      </p>
      <p class="text-sm font-semibold drop-shadow-md">
        from <b>{{ currentSong.anime }}</b>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Howl } from "howler";
import songs from "../assets/songs.ts";
import hotkeys from "hotkeys-js";

let sound: Howl | null = null;
const progress = ref("0%");
const currentSongIndex = ref(-1);
const currentSong = computed(() =>
  currentSongIndex.value === -1
    ? {
        title: "No song playing",
        artist: "N/A",
        anime: "N/A",
        art: "unknown.png",
        file: "",
      }
    : songs[currentSongIndex.value],
);
const currentSongArt = computed(
  () =>
    new URL(`../assets/songs/art/${currentSong.value.art}`, import.meta.url)
      .href,
);
let interval: number | undefined = undefined;

onMounted(() => {
  interval = setInterval(updateCurrentTime, 100);

  hotkeys("alt+j", (event) => {
    event.preventDefault();
    sound?.playing() ? sound?.pause() : sound?.play();
  });

  hotkeys("alt+k", (event) => {
    event.preventDefault();
    nextSong();
  });

  hotkeys("alt+l", (event) => {
    event.preventDefault();
    resetCurrentSong();
  });
});

onUnmounted(() => {
  clearInterval(interval);
  if (sound?.playing()) {
    sound.stop();
  }

  hotkeys.unbind("alt+j");
  hotkeys.unbind("alt+k");
  hotkeys.unbind("alt+l");
});

function resetCurrentSong() {
  sound?.stop();

  if (currentSongIndex.value === -1) {
    shuffleSongs();
    currentSongIndex.value = 0;
  }

  sound = new Howl({
    src: [
      new URL(`../assets/songs/${currentSong.value.file}`, import.meta.url)
        .href,
    ],
    onend: () => {
      nextSong();
    },
    onloaderror: () => {
      console.error("shit fucked");
    },
  });

  sound?.play();

  console.log("started again.");
}

function updateCurrentTime() {
  if (sound?.playing()) {
    progress.value = `${(sound.seek() / sound.duration()) * 100}%`;
  }
}

function shuffleSongs(): void {
  shuffleArray(songs);
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextSong() {
  console.log("next");
  var index = currentSongIndex.value;
  index++;
  if (index >= songs.length) {
    // shuffleSongs();
    index = 0;
  }
  currentSongIndex.value = index;
  resetCurrentSong();
}
</script>

<style>
.loading-bg {
  --count: v-bind("progress");
  background: conic-gradient(
    white,
    white var(--count),
    transparent var(--count)
  );
}
</style>
