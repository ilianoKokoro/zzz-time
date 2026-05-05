<script setup lang="ts">
import Countdown from "@/components/countdown/Countdown.vue";
import DatePicker from "@/components/shadcn/date-picker/DatePicker.vue";
import TimePicker from "@/components/time-picker/TimePicker.vue";
import { ref } from "vue";

const selectedDate = ref(new Date());
</script>

<template>
    <div>ZZZ Time</div>
    <div>
        What time do you wanna <br />
        KILL PC ?
    </div>
    <TimePicker />
    <DatePicker />
    <Countdown />
</template>
