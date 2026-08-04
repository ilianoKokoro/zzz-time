<script setup lang="ts">
import Countdown from "@/components/countdown/Countdown.vue";
import Button from "@/components/shadcn/button/Button.vue";
import TimePicker from "@/components/time-picker/TimePicker.vue";
import { Time } from "@/models/time";
import {
    clearSchedule,
    loadSchedule,
    saveSchedule,
} from "@/core/scheduleStorage";
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";

const time = ref<Time>(new Time());
const scheduleTime = ref<Time | undefined>(undefined);

async function scheduleShutdown() {
    const seconds = time.value.getSecondsUntilNext();
    await invoke("schedule_shutdown", { seconds });

    const timestamp = Date.now() + seconds * 1000;
    saveSchedule(time.value.hour, time.value.minute, timestamp);
    scheduleTime.value = new Time(
        time.value.hour,
        time.value.minute,
        timestamp,
    );
}

async function cancelShutdown() {
    await invoke("cancel_shutdown");
    clearSchedule();
    scheduleTime.value = undefined;
}

const stored = loadSchedule();
if (stored && stored.timestamp > Date.now()) {
    time.value = new Time(stored.hour, stored.minute);
    scheduleTime.value = new Time(stored.hour, stored.minute, stored.timestamp);
} else if (stored) {
    clearSchedule();
}
</script>

<template>
    <div class="flex text-center flex-col items-center h-full w-full gap-8 p-3">
        <div>
            What time do you wanna
            <br />
            <span class="text-2xl"> KILL YOUR PC ?</span>
        </div>

        <TimePicker v-model="time" />
        <div class="flex flex-row gap-1">
            <Button size="xl" @click="scheduleShutdown">KILL</Button>
            <Button
                size="xl"
                :disabled="scheduleTime == undefined"
                variant="secondary"
                @click="cancelShutdown"
                >Cancel</Button
            >
        </div>

        <Countdown :time="scheduleTime" />
    </div>
</template>
