use std::process::Command;

#[cfg(windows)]
use std::os::windows::process::CommandExt;

use tauri::Window;

const CREATE_NO_WINDOW: u32 = 0x08000000;
const SHUTDOWN_COMMAND: &str = "shutdown";

#[tauri::command]
pub fn show_window(window: Window) {
    let _ = window.show();
    let _ = window.set_focus();
}

#[tauri::command]
pub fn schedule_shutdown(seconds: u32) -> bool {
    let _ = cancel_shutdown();
    let seconds_str = seconds.to_string();
    run_command(SHUTDOWN_COMMAND, &["/s", "/t", &seconds_str])
}

#[tauri::command]
pub fn cancel_shutdown() -> bool {
    let args = ["/a"];
    run_command(SHUTDOWN_COMMAND, &args)
}

fn run_command(command: &str, args: &[&str]) -> bool {
    let mut cmd = Command::new(command);
    cmd.args(args);

    #[cfg(windows)]
    {
        cmd.creation_flags(CREATE_NO_WINDOW);
    }

    cmd.spawn().is_ok()
}
