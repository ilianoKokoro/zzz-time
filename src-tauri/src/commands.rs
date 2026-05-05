use std::process::Command;

#[tauri::command]
pub fn schedule_shutdown(seconds: u32) -> bool {
    Command::new("shutdown")
        .args(["/s", "/t", &seconds.to_string()])
        .spawn()
        .is_ok()
}

#[tauri::command]
pub fn cancel_shutdown() -> bool {
    Command::new("shutdown").arg("/a").spawn().is_ok()
}
