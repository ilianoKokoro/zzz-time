import constants from "@/core/constants";
import type { StoredSchedule } from "@/models/storedSchedule";

export function saveSchedule(hour: number, minute: number, timestamp: number) {
    localStorage.setItem(
        constants.SCHEDULE_KEY,
        JSON.stringify({ hour, minute, timestamp }),
    );
}

export function loadSchedule(): StoredSchedule | undefined {
    try {
        const raw = localStorage.getItem(constants.SCHEDULE_KEY);
        if (!raw) return undefined;

        const parsed = JSON.parse(raw) as Partial<StoredSchedule>;
        if (
            typeof parsed.hour !== "number" ||
            typeof parsed.minute !== "number" ||
            typeof parsed.timestamp !== "number"
        ) {
            return undefined;
        }

        return parsed as StoredSchedule;
    } catch {
        return undefined;
    }
}

export function clearSchedule() {
    localStorage.removeItem(constants.SCHEDULE_KEY);
}
