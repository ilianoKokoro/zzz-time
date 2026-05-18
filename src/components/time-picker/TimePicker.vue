<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { onBeforeUnmount, ref, watch } from "vue";

import Button from "@/components/shadcn/button/Button.vue";
import Input from "@/components/shadcn/input/Input.vue";
import { Time } from "@/models/time";

const props = defineProps<{
    modelValue: Time;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Time): void;
}>();

const timeString = ref("");

let holdTimeout: ReturnType<typeof setTimeout> | undefined;
let holdInterval: ReturnType<typeof setInterval> | undefined;

function formatTime(time: Time): string {
    return [
        time.hour.toString().padStart(2, "0"),
        time.minute.toString().padStart(2, "0"),
    ].join(":");
}

function emitTime(hour: number, minute: number) {
    const newTime = new Time();

    newTime.hour = ((hour % 24) + 24) % 24;
    newTime.minute = ((minute % 60) + 60) % 60;

    emit("update:modelValue", newTime);
}

function stopHolding() {
    clearTimeout(holdTimeout);
    clearInterval(holdInterval);

    holdTimeout = undefined;
    holdInterval = undefined;
}

function startHolding(callback: () => void) {
    stopHolding();

    callback();

    holdTimeout = setTimeout(() => {
        holdInterval = setInterval(callback, 80);
    }, 350);
}

watch(
    () => props.modelValue,
    (value) => {
        timeString.value = formatTime(value);
    },
    { immediate: true, deep: true },
);

onBeforeUnmount(stopHolding);

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

    emitTime(hour, minute);
}

function incrementHours() {
    emitTime(props.modelValue.hour + 1, props.modelValue.minute);
}

function decrementHours() {
    emitTime(props.modelValue.hour - 1, props.modelValue.minute);
}

function incrementMinutes() {
    const minute = props.modelValue.minute + 1;
    const hour =
        minute > 59 ? props.modelValue.hour + 1 : props.modelValue.hour;

    emitTime(hour, minute);
}

function decrementMinutes() {
    const minute = props.modelValue.minute - 1;
    const hour = minute < 0 ? props.modelValue.hour - 1 : props.modelValue.hour;

    emitTime(hour, minute);
}
</script>

<template>
    <div class="flex items-center gap-2">
        <div class="flex flex-col gap-2">
            <Button
                variant="outline"
                size="icon"
                class="h-9 w-9 select-none"
                @pointerdown="startHolding(incrementHours)"
                @pointerup="stopHolding"
                @pointerleave="stopHolding"
                @pointercancel="stopHolding"
            >
                <ChevronUp class="h-5 w-5" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                class="h-9 w-9 select-none"
                @pointerdown="startHolding(decrementHours)"
                @pointerup="stopHolding"
                @pointerleave="stopHolding"
                @pointercancel="stopHolding"
            >
                <ChevronDown class="h-5 w-5" />
            </Button>
        </div>

        <Input
            type="time"
            step="60"
            :model-value="timeString"
            @update:model-value="updateTime"
            class="h-20 text-6xl! font-semibold w-auto appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />

        <div class="flex flex-col gap-2">
            <Button
                variant="outline"
                size="icon"
                class="h-9 w-9 select-none"
                @pointerdown="startHolding(incrementMinutes)"
                @pointerup="stopHolding"
                @pointerleave="stopHolding"
                @pointercancel="stopHolding"
            >
                <ChevronUp class="h-5 w-5" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                class="h-9 w-9 select-none"
                @pointerdown="startHolding(decrementMinutes)"
                @pointerup="stopHolding"
                @pointerleave="stopHolding"
                @pointercancel="stopHolding"
            >
                <ChevronDown class="h-5 w-5" />
            </Button>
        </div>
    </div>
</template>
