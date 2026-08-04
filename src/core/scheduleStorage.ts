import constants from "@/core/constants";
import type { StoredSchedule } from "@/models/storedSchedule";
import { load } from "@tauri-apps/plugin-store";

const store = load(constants.STORE_FILE, { autoSave: true });

export async function saveSchedule(
    hour: number,
    minute: number,
    timestamp: number,
) {
    const s = await store;
    await s.set(constants.SCHEDULE_KEY, { hour, minute, timestamp });
}

export async function loadSchedule(): Promise<StoredSchedule | undefined> {
    try {
        const s = await store;
        const parsed = await s.get<StoredSchedule>(constants.SCHEDULE_KEY);
        if (
            !parsed ||
            typeof parsed.hour !== "number" ||
            typeof parsed.minute !== "number" ||
            typeof parsed.timestamp !== "number"
        ) {
            return undefined;
        }

        return parsed;
    } catch {
        return undefined;
    }
}

export async function clearSchedule() {
    const s = await store;
    await s.delete(constants.SCHEDULE_KEY);
}
