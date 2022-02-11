#![feature(generic_associated_types)]
#![feature(in_band_lifetimes)]

#![allow(unused_variables)]
#![allow(unused_imports)]
use array2d::Array2D;
use rand::Rng;
use speedy2d::window::{WindowHandler, WindowHelper};
use speedy2d::Graphics2D;
use speedy2d::Window;
use std::env;

fn main() {
    let window = Window::new_centered("Tictactoe Game", (640, 480)).unwrap();
    let mut game;
    let a = env::args().skip(1).collect::<Vec<String>>();
    let first;
    let second;
    //kinda a stupid/lazy way of doing this, but I'm deciding whether to do a PvP or Player vs CPU game based on the number of args passed to the program, because it's simple, effective, and easy to implement :|
    if env::args().len() > 1 {
        first = a[0].as_str();
        second = a[1].as_str();
        game = TicTacToe::new_2_humans(
            first, second
        );
    } else {
        game = TicTacToe::new_with_1_cpu();
    }
    for i in 0..9 {
        //render(game);
        if i & 2 == 0 {
            game.player1.take_turn(&mut game);
        } else {
            game.player2.take_turn(&mut game);
        }
        if let Some(player) = game.check_for_winner() {
            game.display_winner(player.name());
            //The WindowHandler will close the window once the user presses a key
            game.game_over = true;
            loop {}
        }
    }
    game.display_cats_game();
    //The WindowHandler will close the window once the user presses a key
    game.game_over = true;
    loop {}
}

use crate::Player::*;
#[derive(Clone, Copy, PartialEq)]
enum Player<'a> {
    Human(&'a str),
    CPU,
}
impl Player<'_> {
    pub fn take_turn(&self, ttt: &mut TicTacToe) {
        match self {
            CPU => self.cpu_take_turn(ttt),
            Human(_) => self.human_take_turn(ttt),
        }
    }
    fn cpu_take_turn(&self, ttt: &mut TicTacToe) {
        todo!()
    }
    fn human_take_turn(&self, ttt: &mut TicTacToe) {
        todo!();
    }
    pub fn name(&self) -> &str {
        if let Human(name) = self {
            name
        } else {
            "The CPU"
        }
    }
}
#[derive(Clone, PartialEq)]
pub(crate) enum BoardState<'a> {
    O(Player<'a>),
    X(Player<'a>),
    Blank,
}
impl BoardState<'_> {
    fn get_owner(&self) -> Option<Player> {
        match self {
            Self::O(player) => Some(*player),
            Self::X(player) => Some(*player),
            Self::Blank => None,
        }
    }
}

struct Board<'a> {
board: Array2D<BoardState<'a>>
}
impl Board<'_> {
    pub fn new() -> Self {
	Self {board: array2d::Array2D::filled_with(BoardState::Blank, 3, 3) }
    }
}
impl std::ops::Index<(usize, usize)>for Board<'a> {
    type Output = BoardState<'a>;
    fn index(&self, indices: (usize, usize)) -> &Self::Output {
    let board = &self.board;
        let (row, column) = indices;
        &board.get(row, column).unwrap()
    }
}
struct TicTacToe<'a> {
    player1: Player<'a>,
    player2: Player<'a>,
    board: Board<'a>,
    game_over: bool,
}
impl TicTacToe<'a> {
    pub fn new_2_humans(n1: &'a str, n2: &'a str) -> Self {
        Self {
            player1: Player::Human::<'a>(n1),
            player2: Player::Human(n2),
            board: Board::new(),
            game_over: false,
        }
    }
    pub fn new_with_1_cpu() -> Self {
        Self {
            player1: Player::Human("The human"),
            player2: CPU,
            board: Board::new(),
            game_over: false,
        }
    }

    pub fn check_for_winner(&self) -> Option<Player> {
        let board = &self.board;
        for i in 0..3 {
            if board[(i,0)] != BoardState::Blank
                && board[(i,0)] == board[(i,1)]
                && board[(i,0)] == board[(i,2)]
            {
                return board[(i, 0)].get_owner();
            }
        }
        for i in 0..3 {
            if board[(0,i)] != BoardState::Blank
                && board[(0,i)] == board[(1,i)]
                && board[(0,i)] == board[(2,i)]
            {
                return board[(0,i)].get_owner();
            }
        }
        if board[(0,0)] != BoardState::Blank
            && board[(0,0)] == board[(1,1)]
            && board[(0,0)] == board[(2,2)]
        {
            return board[(0,0)].get_owner();
        }
        if board[(0,2)] != BoardState::Blank
            && board[(0,2)] == board[(1,1)]
            && board[(0,2)] == board[(2,0)]
        {
            return board[(0, 2)].get_owner();
        }
        None
    }
    pub fn display_winner(&self, winner_name: &str) {
        todo!();
    }
    pub fn display_cats_game(&self) {
        todo!()
    }
}

impl WindowHandler for TicTacToe<'_> {
    fn on_keyboard_char(&mut self, helper: &mut WindowHelper, unicode_codepoint: char) {
        if self.game_over {
            helper.terminate_loop();
        }
    }
}
