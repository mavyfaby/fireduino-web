<template>
  <div>
    <div class="main-container">
      <div class="flex flex-col">
        <div ref="tx1" class="text-sm lg:text-base" />
        <h2 ref="tx2" class="text-5xl lg:text-6xl font-bold my-7" />
        <h6 ref="tx3" class="text-sm mx-10 lg:mx-0 lg:text-lg tracking-wide leading-6" />
        <div class="flex justify-center lg:justify-start">
          <md-filled-button ref="el1" class="invisible opacity-0 mt-8" label="Get Started" />
        </div>
      </div>
      <div class="flex justify-center lg:justify-end">
        <img
          ref="el2"
          :src="store.dark ? previewImageDark : previewImageLight"
          class="invisible opacity-0 w-64 lg:w-[300px] mt-16"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import previewImageLight from "~/assets/img/mobile-light.png";
import previewImageDark from "~/assets/img/mobile-dark.png";

import Typed from "typed.js";
import anime from 'animejs/lib/anime.es.js';
import { ref, onMounted } from "vue";
import { useStore } from "~/store";

const store = useStore();

const strings = [
  "INTRODUCING",
  "Fireduino",
  "An advanced fire detection and extinguishing systems, along with automated alerts to the nearest fire station",
];

const tx1 = ref<HTMLElement | null>(null);
const tx2 = ref<HTMLElement | null>(null);
const tx3 = ref<HTMLElement | null>(null);
const el1 = ref<HTMLElement | null>(null);
const el2 = ref<HTMLElement | null>(null);

onMounted(() => {
  const tx1Text = strings[0];
  const tx2Text = strings[1];
  const tx3Text = strings[2];

  anime({
    targets: tx1.value,
    translateY: [-50, 0],
    scale: [0.75, 1],
    delay: 1000,
    duration: 2000,
    easing: 'easeOutElastic(0.5, 0.4)'
  })

  anime({
    targets: tx2.value,
    translateY: [-50, 0],
    scale: [0.75, 1],
    delay: 2100,
    duration: 2000,
    easing: 'easeOutElastic(0.5, 0.4)'
  });

  anime({
    targets: tx3.value,
    translateY: [-50, 0],
    scale: [0.75, 1],
    delay: 3500,
    duration: 2000,
    easing: 'easeOutElastic(0.5, 0.4)'
  });

  new Typed(tx1.value, {
    strings: [tx1Text],
    startDelay: 1000,
    typeSpeed: 50,
    showCursor: false,
  });

  new Typed(tx2.value, {
    strings: [tx2Text],
    startDelay: 2100,
    typeSpeed: 50,
    showCursor: false,
  });

  new Typed(tx3.value, {
    strings: [tx3Text],
    typeSpeed: 15,
    startDelay: 3500,
    showCursor: false,
    onComplete() {
      el1.value?.classList.remove("invisible");

      anime({
        targets: el1.value,
        translateY: [-20, 0],
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(0.5, 0.4)',
        complete() {
          
          el2.value?.classList.remove("invisible");

          anime({
            targets: el2.value,
            translateY: [-20, 0],
            scale: [0.5, 1],
            opacity: [0, 1],
            duration: 2000,
            easing: 'easeOutElastic(1, 0.8)',
            complete() {
              
              anime({
                targets: el2.value,
                translateY: 20,
                duration: 2000,
                loop: true,
                direction: 'alternate',
                easing: 'linear',
              });
            }
          });
        }
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
</style>
