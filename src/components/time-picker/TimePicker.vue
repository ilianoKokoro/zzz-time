<script setup lang="ts">
import { computed } from "vue";

import Input from "@/components/shadcn/input/Input.vue";
import { Time } from "@/models/time";

const props = defineProps<{
    modelValue: Time;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Time): void;
}>();

const timeString = computed({
    get: () => {
        return [
            props.modelValue.hour.toString().padStart(2, "0"),
            props.modelValue.minute.toString().padStart(2, "0"),
        ].join(":");
    },

    set: (value: string) => {
        const [hour, minute] = value.split(":").map((v) => Number(v));

        const newTime = new Time();

        newTime.hour = Number.isNaN(hour) ? 0 : hour;
        newTime.minute = Number.isNaN(minute) ? 0 : minute;

        emit("update:modelValue", newTime);
    },
});
</script>

<template>
    <Input
        type="time"
        step="60"
        v-model="timeString"
        class="h-20 text-6xl font-semibold w-auto appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
</template>
