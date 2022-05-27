#![feature(in_band_lifetimes)]
use array2d::Array2D;
use rand::Rng;
use std::{sync::{Mutex, Arc}, ops::IndexMut, env};
slint::include_modules!();
fn main() {
    let game;
    let a = env::args().skip(1).collect::<Vec<String>>();
    let first;
    let second;
    //kinda a stupid/lazy way of doing this, but I'm deciding whether to do a PvP or Player vs CPU game based on the number of args passed to the program, because it's simple, effective, and easy to implement :|
    if env::args().len() > 1 {
        first = a[0].clone();
        second = a[1].clone();
        game = Arc::new(Mutex::new(TicTacToe::new_2_humans(first, second)));
    } else {
        game = Arc::new(Mutex::new(TicTacToe::new_with_1_cpu()));
    }

    let mut turn = 0;
    //GUI initialization
    let t3w = TicTacToeWindow::new();
    t3w.set_turntaker_name("null".into());
    t3w.set_turncount(0);
    //functionally the same as calling their respective tile's display method instead like done in the loop
    t3w.set_tile_1_value("-".into());
    t3w.set_tile_2_value("-".into());
    t3w.set_tile_3_value("-".into());
    t3w.set_tile_4_value("-".into());
    t3w.set_tile_5_value("-".into());
    t3w.set_tile_6_value("-".into());
    t3w.set_tile_7_value("-".into());
    t3w.set_tile_8_value("-".into());
    t3w.set_tile_9_value("-".into());

    let t3w_weak = t3w.as_weak();

    let mut game_clo = game.clone();
    let game_clone = &mut game_clo as *mut Arc<Mutex<TicTacToe>>;

    t3w.on_tile_clicked(move |picked_tile_number| {
        let game_clone = unsafe {&*game_clone};
        if (*game_clone.lock().unwrap()).game_over {
            //exit the game if the game's ended and the player clicked something
            //TODO: make screen-wide touch area so the player can click anywhere when the game is over to close the window, instead of just inside the tiles
            std::process::exit(0);
        }

        let t3w = t3w_weak.unwrap();
        
        //update turn counter
        turn = t3w.get_turncount();
        turn += 1;
        t3w.set_turncount(turn);

        //update the clicked tile to the current player's icon;
        let mut clicked_tile = ((*game_clone).get_mut().unwrap()).board.index_mut(picked_tile_number.try_into().unwrap());
        *clicked_tile = if turn & 1 == 0 {
            BoardState::O((*game_clone.lock().unwrap()).player1.clone())
        }
        else {
            BoardState::X((*game_clone.lock().unwrap()).player2.clone())
        };

        //update the picked tile's display in the GUI
        match picked_tile_number {
            1 => t3w.set_tile_1_value(clicked_tile.display().into()),
            2 => t3w.set_tile_2_value(clicked_tile.display().into()),
            3 => t3w.set_tile_3_value(clicked_tile.display().into()),
            4 => t3w.set_tile_4_value(clicked_tile.display().into()),
            5 => t3w.set_tile_5_value(clicked_tile.display().into()),
            6 => t3w.set_tile_6_value(clicked_tile.display().into()),
            7 => t3w.set_tile_7_value(clicked_tile.display().into()),
            8 => t3w.set_tile_8_value(clicked_tile.display().into()),
            9 => t3w.set_tile_9_value(clicked_tile.display().into()),
            _ => panic!()
            }

        //check to see if someone won
        if let Some(player) = (*game_clone.lock().unwrap()).check_for_winner() {
            (*game_clone.lock().unwrap()).display_winner(player.name());
            //The ~~WindowHandler~~ (FIXME!) will close the window once the user presses a key
            (*game_clone.lock().unwrap()).game_over = true;
        }

        //if the board's full and no one won, indicate that the game is over
        if turn == 9 {
            (*game_clone.lock().unwrap()).display_cats_game();
        }
        
        //take the CPU's turn immediately after the player if there's a CPU in the game
        //TODO: add functionality for the CPU to be the first player
        //NOTE much of the code is duplicated from above
        //NOTE: various optimization opportunities are available here
        if let Player::CPU = (*game_clone.lock().unwrap()).player2 {

            //have the CPU choose an empty file and mark it with their symbol
            let picked_tile_number = (*game_clone.lock().unwrap()).cpu_choose_tile();
            let mut chosen_tile = (*game_clone.lock().unwrap()).board.index_mut(picked_tile_number.try_into().unwrap());
            *chosen_tile = if turn & 1 == 0 {
                BoardState::O((*game_clone.lock().unwrap()).player1.clone())
            }
            else {
                BoardState::X((*game_clone.lock().unwrap()).player2.clone())
            };

            //update the picked tile's display in the GUI
            match picked_tile_number {
                1 => t3w.set_tile_1_value(chosen_tile.display().into()),
                2 => t3w.set_tile_2_value(chosen_tile.display().into()),
                3 => t3w.set_tile_3_value(chosen_tile.display().into()),
                4 => t3w.set_tile_4_value(chosen_tile.display().into()),
                5 => t3w.set_tile_5_value(chosen_tile.display().into()),
                6 => t3w.set_tile_6_value(chosen_tile.display().into()),
                7 => t3w.set_tile_7_value(chosen_tile.display().into()),
                8 => t3w.set_tile_8_value(chosen_tile.display().into()),
                9 => t3w.set_tile_9_value(chosen_tile.display().into()),
                _ => panic!()
            }

            //update turn count (again)
            turn += 1;
            t3w.set_turncount(turn);

            //check to see if someone won
            if let Some(player) = (*game_clone.lock().unwrap()).check_for_winner() {
                (*game_clone.lock().unwrap()).display_winner(player.name());
                //The WindowHandler will close the window once the user presses a key
                (*game_clone.lock().unwrap()).game_over = true;
            }
            
            //if the board's full and no one won, indicate that the game is over
            if turn == 9 {
                (*game_clone.lock().unwrap()).display_cats_game();
            }
            
        }
    });

    t3w.run();
}

use crate::Player::*;
#[derive(Clone, Copy, PartialEq)]
enum Player<'a> {
    Human(&'a str),
    CPU,
}
impl Player<'_> {
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
    fn display(&self) -> &str {
        match *self {
            Self::O(_) => "O",
            Self::X(_) => "X",
            Self::Blank => "-"
        }
    }
}

struct Board<'a> {
    board: Array2D<BoardState<'a>>,
}
impl Board<'a> {
    pub fn new() -> Self {
        Self {
            board: array2d::Array2D::filled_with(BoardState::Blank, 3, 3),
        }
    }
    pub fn index_mut(&'a mut self, index: u8) -> &'a mut BoardState {
        let board = &mut self.board;
        board.index_mut((( index % 3).into(), (index / 3).into() ))
    }
}
impl std::ops::Index<(usize, usize)> for Board<'a> {
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
    pub fn new_2_humans(n1: String, n2: String) -> Self {
        Self {
            player1: Player::Human::<'a>(n1.as_str()),
            player2: Player::Human(n2.as_str()),
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
            if board[(i, 0)] != BoardState::Blank
                && board[(i, 0)] == board[(i, 1)]
                && board[(i, 0)] == board[(i, 2)]
            {
                return board[(i, 0)].get_owner();
            }
        }
        for i in 0..3 {
            if board[(0, i)] != BoardState::Blank
                && board[(0, i)] == board[(1, i)]
                && board[(0, i)] == board[(2, i)]
            {
                return board[(0, i)].get_owner();
            }
        }
        if board[(0, 0)] != BoardState::Blank
            && board[(0, 0)] == board[(1, 1)]
            && board[(0, 0)] == board[(2, 2)]
        {
            return board[(0, 0)].get_owner();
        }
        if board[(0, 2)] != BoardState::Blank
            && board[(0, 2)] == board[(1, 1)]
            && board[(0, 2)] == board[(2, 0)]
        {
            return board[(0, 2)].get_owner();
        }
        None
    }
    pub fn display_winner(&self, _winner_name: &str) {
        todo!();
    }
    pub fn display_cats_game(&self) {
        todo!();
    }
    fn cpu_choose_tile(&self) -> u8 {
        let _cpu = &self.player2;
        let board = &self.board;
        let mut open_tiles = 0;
        let mut tiles = vec![0u8;9];
        for x in 0..3 {
            for y in 0..3 {
                if board[(x,y)] == BoardState::Blank {
                    open_tiles += 1;
                    tiles[3 * x + y] = 1;
                }
            }
        }
        let mut rng = rand::thread_rng();
        let pick = rng.gen_range(0..open_tiles);
        let mut discount = false;
        let mut chosen_tile_number = 0u8;
        for mut i in 0..pick {
            if discount {i -= 1;}
            chosen_tile_number = i;
            if tiles[i as usize] == 1 {
                discount = true;
            }
            else {
                discount = false;
            }
        }
        chosen_tile_number
    }
}