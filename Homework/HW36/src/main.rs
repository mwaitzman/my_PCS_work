use std::rc::Rc;
use slint::{Timer, TimerMode};

slint::include_modules!();
fn main() {
    
    let timer_gui_original = Rc::new(TimerGUI::new());
    let one_sec_timer_original = Rc::new(Timer::default());

    let one_sec_timer = Rc::clone(&one_sec_timer_original);
    let timer_gui = Rc::clone(&timer_gui_original);


    timer_gui_original.on_start_timer(move || {
        
        let timer_gui = Rc::clone(&timer_gui);

        one_sec_timer.start(TimerMode::Repeated, std::time::Duration::from_secs(1), move || {

            let curtime = timer_gui.get_current_time();
            let mut minutes = curtime.minutes;
            let mut seconds = curtime.seconds;

            if seconds == 59 {
                seconds = 0;
                minutes += 1;
            }
            else {
                seconds += 1;
            }

            timer_gui.set_current_time(Time {minutes, seconds});
            timer_gui.set_cur_time_string(format!("{:02}:{:02}", minutes, seconds).into());

         });
    });


    let one_sec_timer = Rc::clone(&one_sec_timer_original);

    timer_gui_original.on_stop_timer(move || {

        one_sec_timer.stop();
        
    });


    let one_sec_timer = Rc::clone(&one_sec_timer_original);
    let timer_gui = Rc::clone(&timer_gui_original);

    timer_gui_original.on_restart_timer(move || {

        timer_gui.set_current_time(Time {minutes: 0, seconds: 0});
        timer_gui.set_cur_time_string(format!("{:02}:{:02}", 0, 0).into());
        one_sec_timer.restart();

    });


    timer_gui_original.run();

}