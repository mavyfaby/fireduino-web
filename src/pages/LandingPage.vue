<template>
  <div class="main-container">
    <div class="flex flex-col">
      <div ref="tx1" class="h-6 text-sm font-medium text-on-surface lg:text-base poppins" />
      <h2 ref="tx2" class="title poppins" />
      <h6 ref="tx3" class="text-base tracking-[0.1px] mx-10 lg:mx-0 lg:text-lg leading-7" />
      <div class="flex justify-center lg:justify-start">
        <md-filled-button @click="goToLogin" ref="el1" class="invisible opacity-0 mt-8">
          Get Started
        </md-filled-button>
      </div>
    </div>
    <div ref="tlt" data-tilt data-tilt-reverse="true" data-tilt-full-page-listening>
      <div ref="el2" class="invisible flex justify-center lg:justify-end">
        <img :src="previewImageDark" class="w-64 lg:w-[300px] mt-16 absolute" :class="store.dark ? 'opacity-1' : 'opacity-0'" />
        <img :src="previewImageLight" class="w-64 lg:w-[300px] mt-16" :class="store.dark ? 'opacity-0' : 'opacity-1'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import previewImageLight from "~/assets/img/mobile-light.png";
import previewImageDark from "~/assets/img/mobile-dark.png";

import Typed from "typed.js";
import VanillaTilt from 'vanilla-tilt';
import anime from 'animejs/lib/anime.es.js';

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/store";

const store = useStore();
const router = useRouter();

const strings = [
  "INTRODUCING",
  "Fireduino",
  "An advanced fire detection and extinguishing systems, along with automated alerts to the nearest fire station!",
];

const tx1 = ref<HTMLElement | null>(null);
const tx2 = ref<HTMLElement | null>(null);
const tx3 = ref<HTMLElement | null>(null);
const el1 = ref<HTMLElement | null>(null);
const el2 = ref<HTMLElement | null>(null);
const tlt = ref<HTMLElement | null>(null);

function goToLogin() {
  router.push("/login");
}

onMounted(() => {
  const tx1Text = strings[0];
  const tx2Text = strings[1];
  const tx3Text = strings[2];

  // Tilt animation
  VanillaTilt.init(tlt.value!);

  // Animation timeline
  const tl = anime.timeline();

  tl.add({
    targets: tx1.value,
    translateY: [-50, 0],
    scale: [0.75, 1],
    delay: 1000,
    duration: 1250,
    easing: 'easeOutElastic(0.5, 0.4)',
    begin() {
      new Typed(tx1.value, {
        strings: [tx1Text],
        startDelay: 900,
        typeSpeed: 50,
        showCursor: false,
      });
    }
  });

  tl.add({
    targets: tx2.value,
    translateY: [-50, 0],
    scale: [0.75, 1],
    rotateZ: [90, 0],
    duration: 1200,
    easing: 'easeOutElastic(0.5, 0.4)',
    begin() {
      new Typed(tx2.value, {
        strings: [tx2Text],
        typeSpeed: 50,
        showCursor: false,
      });
    }
  });

  tl.add({
    targets: tx3.value,
    translateY: [-50, 0],
    scale: [0.75, 1],
    duration: 1000,
    easing: 'easeOutElastic(0.5, 0.4)',
    begin() {
      new Typed(tx3.value, {
        strings: [tx3Text],
        typeSpeed: 15,
        showCursor: false,
        onComplete() {
          el1.value?.classList.remove("invisible");
        }
      });
    },
  });

  tl.add({
    targets: el1.value,
    translateY: [-20, 0],
    scale: [0.5, 1],
    rotateZ: [90, 0],
    opacity: [0, 1],
    delay: 2000,
    duration: 1000,
    easing: 'easeOutElastic(0.5, 0.4)',
    complete() {
      el2.value?.classList.remove("invisible");
    }
  });


  tl.add({
    targets: el2.value,
    translateY: [-20, 0],
    scale: [0.5, 1],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutElastic(1, 0.8)',
    complete() {
      
      // Loop animation
      anime({
        targets: el2.value,
        translateY: 30,
        duration: 2000,
        loop: true,
        direction: 'alternate',
        easing: 'linear',
      });

    }
  });

});
</script>

<style scoped>
.main-container {
  @apply flex flex-col text-center lg:grid grid-cols-2
    lg:gap-10 lg:text-start lg:flex-row items-center mt-16 p-4;
}

img {
  @apply shadow-xl shadow-neutral-300/50 dark:shadow-neutral-700/50 rounded-2xl;
}

.title {
  @apply h-12 text-5xl lg:text-6xl font-bold my-7 text-primary;
  text-shadow: 0 0 0.175rem var(--md-sys-color-primary);
}
</style>
