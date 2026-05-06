<script setup lang="ts">
import { Time } from "@/models/time";
import { computed } from "vue";
import Input from "../shadcn/input/Input.vue";

const props = defineProps<{
    modelValue: Time;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: Time): void;
}>();

const time = computed({
    get: () => props.modelValue,
    set: (value: Time) => {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <div class="flex flex-row gap-1">
        <!-- TODO validate input -->
        <Input
            class="w-20"
            type="number"
            placeholder="HH"
            v-model.number="time.hour"
            min="0"
            max="23"
        />
        <Input
            class="w-20"
            type="number"
            placeholder="MM"
            v-model.number="time.minute"
            min="0"
            max="59"
        />
    </div>
</template>
