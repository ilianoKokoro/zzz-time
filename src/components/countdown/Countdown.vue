<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { Time } from "@/models/time";

// TODO clean up

const props = defineProps({
    time: {
        type: Time,
        required: false,
    },
});

const now = ref(Date.now());

let interval: number | null = null;

const secondsLeft = computed(() => {
    now.value;

    if (!props.time) return 0;
    return Math.max(0, Math.floor(props.time.getSecondsUntilNext()));
});

onMounted(() => {
    interval = window.setInterval(() => {
        now.value = Date.now();
    }, 1000);
});

onBeforeUnmount(() => {
    if (interval) {
        clearInterval(interval);
    }
});

function format(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const formatted = computed(() => format(secondsLeft.value));
</script>

<template>
    <div class="text-6xl">{{ formatted }}</div>
</template>
