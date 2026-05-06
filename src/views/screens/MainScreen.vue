<script setup lang="ts">
import Countdown from "@/components/countdown/Countdown.vue";
import Button from "@/components/shadcn/button/Button.vue";
import TimePicker from "@/components/time-picker/TimePicker.vue";
import { Time } from "@/models/time";
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";

const time = ref<Time>(new Time());
const scheduleTime = ref<Time | undefined>(undefined); // TODO save and get on start

async function scheduleShutdown() {
    await invoke("schedule_shutdown", {
        seconds: time.value.getSecondsUntilNext(),
    });
    scheduleTime.value = time.value;
}

async function cancelShutdown() {
    await invoke("cancel_shutdown");
    scheduleTime.value = undefined;
}
</script>

<template>
    <div class="flex text-center flex-col items-center h-full w-full gap-5 p-3">
        <div class="text-4xl">ZZZ Time</div>
        <div>
            What time do you wanna
            <br />
            <span class="text-2xl"> KILL PC ?</span>
        </div>

        <TimePicker v-model="time" />
        <div class="flex flex-row gap-1">
            <Button size="lg" @click="scheduleShutdown">KILL</Button>
            <Button
                size="lg"
                :disabled="scheduleTime == undefined"
                variant="secondary"
                @click="cancelShutdown"
                >Cancel</Button
            >
        </div>

        <Countdown :time="scheduleTime" />
    </div>
</template>
