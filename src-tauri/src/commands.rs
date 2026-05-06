use std::process::Command;

#[cfg(windows)]
use std::os::windows::process::CommandExt;

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[tauri::command]
pub fn schedule_shutdown(seconds: u32) -> bool {
    let _ = run_command("shutdown", &["/a"]);
    let seconds_str = seconds.to_string();
    run_command("shutdown", &["/s", "/t", &seconds_str])
}

#[tauri::command]
pub fn cancel_shutdown() -> bool {
    let args = ["/a"];
    run_command("shutdown", &args)
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
