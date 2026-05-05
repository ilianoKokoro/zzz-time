<script setup lang="ts">
import { ref, computed } from "vue";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shadcn/popover";
import { Button } from "@/components/shadcn/button";

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

const selectedHour = ref<number | null>(null);
const selectedMinute = ref<number | null>(null);

const modelValue = computed(() => {
    if (selectedHour.value === null || selectedMinute.value === null) return "";
    return `${String(selectedHour.value).padStart(2, "0")}:${String(
        selectedMinute.value,
    ).padStart(2, "0")}`;
});

function setHour(h: number) {
    selectedHour.value = h;
}
function setMinute(m: number) {
    selectedMinute.value = m;
}
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" class="w-[120px] justify-start">
                {{ modelValue || "Pick time" }}
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-[220px] p-3">
            <div class="flex gap-2">
                <div
                    class="flex flex-col h-40 overflow-y-auto border rounded w-1/2"
                >
                    <button
                        v-for="h in hours"
                        :key="h"
                        @click="setHour(h)"
                        class="px-2 py-1 text-sm hover:bg-accent"
                        :class="{ 'bg-accent': selectedHour === h }"
                    >
                        {{ String(h).padStart(2, "0") }}
                    </button>
                </div>

                <div
                    class="flex flex-col h-40 overflow-y-auto border rounded w-1/2"
                >
                    <button
                        v-for="m in minutes"
                        :key="m"
                        @click="setMinute(m)"
                        class="px-2 py-1 text-sm hover:bg-accent"
                        :class="{ 'bg-accent': selectedMinute === m }"
                    >
                        {{ String(m).padStart(2, "0") }}
                    </button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>

<style scoped>
button {
    text-align: left;
}
</style>
