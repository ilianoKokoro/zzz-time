mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![commands::schedule_shutdown])
        .invoke_handler(tauri::generate_handler![commands::cancel_shutdown])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
