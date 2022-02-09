//available peg colors: red, blue, orange, white (clear/colorless), green, yellow, pink, and violet (purple).
#![feature(variant_count)]
use speedy2d::color::Color;
use speedy2d::dimen::Vector2;
use speedy2d::window::{
    KeyScancode, ModifiersState, MouseButton, MouseScrollDistance, VirtualKeyCode, WindowHandler,
    WindowHelper, WindowStartupInfo,
};
use speedy2d::{Graphics2D, Window};
use std::mem;

const ROWS: u32 = 64;
const COLS: u32 = 48;
fn main() {
    let window = Window::new_centered("LiteBrite Simulator", (ROWS * 10, COLS * 10)).unwrap();

    window.run_loop(MyWindowHandler {
        mouse_pos: Vector2::ZERO,
        mouse_button_down: false,
        cur_color: PegColors::White,
    })
}

#[derive(Clone, PartialEq)]
pub enum PegColors {
    White,
    Red,
    Blue,
    Green,
    Yellow,
    //Orange,
    //Pink,
    //Violet,
}

impl PegColors {
    pub fn color(&self) -> Color {
        match self {
            PegColors::White => Color::WHITE,
            PegColors::Red => Color::RED,
            PegColors::Green => Color::GREEN,
            PegColors::Blue => Color::BLUE,
            PegColors::Yellow => Color::YELLOW,
        }
    }
    pub fn as_int(&self) -> u8 {
        match self {
            PegColors::White => 0,
            PegColors::Red => 1,
            PegColors::Green => 2,
            PegColors::Blue => 3,
            PegColors::Yellow => 4,
        }
    }
    pub fn from_int(n: u8) -> Self {
        match n {
            0 => PegColors::White,
            1 => PegColors::Red,
            2 => PegColors::Green,
            3 => PegColors::Blue,
            4 => PegColors::Yellow,
            _ => panic!("haven't implemented the other colors (yet)!"),
        }
    }
}

struct MyWindowHandler {
    mouse_pos: Vector2<f32>,
    mouse_button_down: bool,
    cur_color: PegColors,
}

impl WindowHandler for MyWindowHandler {
    fn on_start(&mut self, helper: &mut WindowHelper, info: WindowStartupInfo) {
        if cfg!(debug_assertations) {
            println!("Got on_start callback: {:?}", &info);
        }
        helper.set_cursor_visible(false);
        helper.set_resizable(false);
    }

    fn on_resize(&mut self, _helper: &mut WindowHelper, size_pixels: Vector2<u32>) {
        if cfg!(debug_assertations) {
            println!("Got on_resize callback: {:?}", &size_pixels);
        }
    }

    fn on_scale_factor_changed(&mut self, _helper: &mut WindowHelper, scale_factor: f64) {
        if cfg!(debug_assertations) {
            println!("Got on_scale_factor_changed callback: {:.3}", &scale_factor);
        }
    }

    fn on_draw(&mut self, _helper: &mut WindowHelper, graphics: &mut Graphics2D) {
        if self.mouse_button_down {
            // Draw a circle at the closest peg to the mouse cursor
            let center = Vector2::new(
                (self.mouse_pos.x.round() / 10.0) * 10.0,
                (self.mouse_pos.y.round() / 10.0) * 10.0,
            );
            graphics.draw_circle(center, 2.5, PegColors::color(&self.cur_color));
        }
    }

    fn on_mouse_move(&mut self, helper: &mut WindowHelper, position: Vector2<f32>) {
        if cfg!(debug_assertations) {
            println!(
                "Got on_mouse_move callback: ({:.1}, {:.1})",
                position.x, position.y
            );
        }

        self.mouse_pos = position;

        helper.request_redraw();
    }

    fn on_mouse_button_down(&mut self, helper: &mut WindowHelper, button: MouseButton) {
        if cfg!(debug_assertations) {
            println!("Got on_mouse_button_down callback: {:?}", &button);
        }

        if button == MouseButton::Left {
            self.mouse_button_down = true;
        }

        helper.request_redraw();
    }

    fn on_mouse_button_up(&mut self, helper: &mut WindowHelper, button: MouseButton) {
        if cfg!(debug_assertations) {
            println!("Got on_mouse_button_up callback: {:?}", &button);
        }

        if button == MouseButton::Left {
            self.mouse_button_down = false;
        }

        helper.request_redraw();
    }

    fn on_mouse_wheel_scroll(
        &mut self,
        _helper: &mut WindowHelper<()>,
        delta: MouseScrollDistance,
    ) {
        if let MouseScrollDistance::Lines { x, y, z } = delta {
            //to get the compiler to stop giving me warnings about my not using `x` and `z`
            let _x = x;
            let _z = z;

            let colors_amount: u8 = mem::variant_count::<PegColors>().try_into().unwrap();
            if y == 1.0 {
                self.cur_color =
                    PegColors::from_int((self.cur_color.as_int() + 1) % (colors_amount - 1));
            } else {
                if self.cur_color.as_int() == 0 {
                    self.cur_color = PegColors::from_int(colors_amount - 1);
                } else {
                    self.cur_color = PegColors::from_int(self.cur_color.as_int() - 1);
                }
            }
        } else {
            dbg!(&delta);
        }
        if cfg!(debug_assertations) {
            println!("Got on_mouse_wheel_scroll callback: {:?}", &delta);
        }
    }

    fn on_key_down(
        &mut self,
        _helper: &mut WindowHelper,
        virtual_key_code: Option<VirtualKeyCode>,
        scancode: KeyScancode,
    ) {
        if cfg!(debug_assertations) {
            println!(
                "Got on_key_down callback: {:?}, scancode {}",
                &virtual_key_code, &scancode
            );
        }
    }

    fn on_key_up(
        &mut self,
        _helper: &mut WindowHelper,
        virtual_key_code: Option<VirtualKeyCode>,
        scancode: KeyScancode,
    ) {
        if cfg!(debug_assertations) {
            println!(
                "Got on_key_up callback: {:?}, scancode {}",
                &virtual_key_code, &scancode
            );
        }
    }

    fn on_keyboard_char(&mut self, _helper: &mut WindowHelper, unicode_codepoint: char) {
        if cfg!(debug_assertations) {
            println!("Got on_keyboard_char callback: '{}'", &unicode_codepoint);
        }
    }

    fn on_keyboard_modifiers_changed(&mut self, _helper: &mut WindowHelper, state: ModifiersState) {
        if cfg!(debug_assertations) {
            println!("Got on_keyboard_modifiers_changed callback: {:?}", &state);
        }
    }
}
