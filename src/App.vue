<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import MainScreen from "./views/screens/MainScreen.vue";
import { onMounted } from "vue";
import { invoke } from "@tauri-apps/api/core";

useColorMode();

onMounted(async () => {
    await invoke("show_window");
});
</script>

<template>
    <main class="select-none">
        <MainScreen />
    </main>
</template>
