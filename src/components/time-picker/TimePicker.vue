<script setup lang="ts">
import { ref, watch } from "vue";

import Input from "@/components/shadcn/input/Input.vue";
import { Time } from "@/models/time";

const props = defineProps<{
    modelValue: Time;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Time): void;
}>();

const timeString = ref("");

function formatTime(time: Time): string {
    return [
        time.hour.toString().padStart(2, "0"),
        time.minute.toString().padStart(2, "0"),
    ].join(":");
}

watch(
    () => props.modelValue,
    (value) => {
        timeString.value = formatTime(value);
    },
    { immediate: true, deep: true },
);

function updateTime(payload: string | number) {
    const value = String(payload);

    timeString.value = value;

    if (!/^\d{2}:\d{2}$/.test(value)) {
        return;
    }

    const [hour, minute] = value.split(":").map(Number);

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return;
    }

    const newTime = new Time();
    newTime.hour = hour;
    newTime.minute = minute;

    emit("update:modelValue", newTime);
}
</script>

<template>
    <Input
        type="time"
        step="60"
        :model-value="timeString"
        @update:model-value="updateTime"
        class="h-20 text-6xl font-semibold w-auto appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
</template>
