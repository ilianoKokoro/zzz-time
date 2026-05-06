<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import MainScreen from "./views/screens/MainScreen.vue";

useColorMode();
</script>

<template>
    <main class="select-none">
        <MainScreen />
    </main>
</template>
