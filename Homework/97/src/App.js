import {Component} from "react";
import {Ops} from "./Ops";
export default class App extends Component {	
	state = {
		total: null,
		op: null,
		current: null,
		is_float: false,

	}

	op(new_op) {
		const old_op = this.state.op;

		switch (new_op) {
			case Ops.ENTER:

				switch(old_op) {
					case Ops.ADD:
						this.setState({
							total: this.state.total
							? Number(this.state.total) + Number(this.state.current)
							: this.state.current,
							current: null,
							op: null,
							is_float: false,
						});
					break;

					case Ops.SUB:
						this.setState({
							total: this.state.total
							? Number(this.state.total) - Number(this.state.current)
							: this.state.current,
							current: null,
							op: null,
							is_float: false,
						});
					break;

					case Ops.MUL:
						this.setState({
							total: this.state.total
							? Number(this.state.total) * Number(this.state.current)
							: this.state.current,
							current: null,
							op: null,
							is_float: false,
						});
					break;

					case Ops.DIV:
						this.setState({
							total: this.state.total
							? Number(this.state.total) / Number(this.state.current)
							: this.state.current,
							current: null,
							op: null,
							is_float: false,
						});
					break;

					case null:
					break;

					default:
						throw new Error("Unreachable!");
				}
			break;

			case Ops.ADD:
			case Ops.SUB:
			case Ops.MUL:
			case Ops.DIV:
				if (this.state.current) {
					switch(old_op) {
						case Ops.ADD:
							this.setState({
								total: this.state.total
								? Number(this.state.total) + Number(this.state.current)
								: this.state.current,
								current: null,
								op: new_op,
								is_float: false,
							});
						break;
	
						case Ops.SUB:
							this.setState({
								total: this.state.total
								? Number(this.state.total) - Number(this.state.current)
								: this.state.current,
								current: null,
								op: new_op,
								is_float: false,
							});
						break;
	
						case Ops.MUL:
							this.setState({
								total: this.state.total
								? Number(this.state.total) * Number(this.state.current)
								: this.state.current,
								current: null,
								op: new_op,
								is_float: false,
							});
						break;
	
						case Ops.DIV:
							this.setState({
								total: this.state.total
								? Number(this.state.total) / Number(this.state.current)
								: this.state.current,
								current: null,
								op: new_op,
								is_float: false,
							});
						break;
	
						case null:
							this.setState({
								total: this.state.current,
								current: null,
								op: new_op,
								is_float: false,
							})
						break;
	
						default:
							throw new Error("Unreachable!");
					}
				} else {
					this.setState({op: new_op});
				}

			break;

			case Ops.CLEAR:
				this.setState({
					total: null,
					op: null,
					current: null,
					is_float: false,
				})
			break;

			case Ops.BACKSPACE:
				if (this.state.current) {
					this.setState({current: this.state.current.slice(0, -1)})
				}
			break;

			default:
		}

	}
	numpress(num) {
		this.setState({current: this.state.current
			? this.state.current + num
			: ''+num
		});
	}

	decimalpoint() {
		this.setState({
			current: this.state.current
				? this.state.current + '.'
				: '0.',
			is_float: true
		});
	}
	
	////NOTE: currently only supports left-to-right addition/subtraction/multiplication/division (and implicit multiplication ). Parentheses, exponentiation, modulus, Order of Operations, etc. are not (yet) supported
	i(str) {
		const s = str.trimStart().trimEnd();
		console.log(`s: ${s}`);
		if (s === "") {
			return;
		}



		const chomp_space = (s, idx) => {
			let chomps = 0;
			for (let i = idx; i < s.length; i++) {
				if (s.charAt(i) === ' ') {
					chomps++;
				} else {
					break;
				}
			};
			return chomps;
		};


		const chomp_num = (s, idx) => {
			/////
			let buf = "";
			let c;
			let chomps = 0;
			let is_float = false;
			while (idx+chomps < s.length) {
				c = s[idx+chomps];
				if (c === '-') {
					if (buf === "") {
						buf = "-";
						chomps++;
					} else {
						return {
							chomps,
							num: Number(buf)
						}
					}
				} else if (c === '.') {
					if (is_float) {
						////NOTE: this does not allow numbers like `1.` (although `.1` is allowed)
						throw new Error();
					} else {
						is_float = true;
						buf += '.';
						chomps++;
					}
				} else if (c === '_' || c === ',') {
					chomps++;
				} else if ('0' <= c && c <= '9') {
					buf += c;
					chomps++;
				} else {
					return {
						chomps,
						num: Number(buf)
					};
				}
			}
			return {
				chomps,
				num: Number(buf)
			};
		};


		const chomp_op = (s, idx) => {
			let c = s.charAt(idx);
			switch (c) {
				case '+':
					return {
						chomps: 1,
						op: Ops.ADD
					};
				
				case '-':
					return {
						chomps: 1,
						op: Ops.SUB
					};

				case '*':
					return {
						chomps: 1,
						op: Ops.MUL
					};

				case '/':
					return {
						chomps: 1,
						op: Ops.DIV
					};

				default:
					return {
						chomps: 0,
						op: null
					};
			}
		};

		//// =n queued op
		let qo = null;
		//// =n preceding whitespace
		let pws = false;
		let idx = 0;
		let total;
		try {
			let r = chomp_num(s, idx);
			idx += r.chomps;
			total = r.num;
	
			while (idx < s.length) {
				r = chomp_space(s, idx);
				if (r !== 0) {
					pws = true;
					idx += r;
				////NOTE: no need to check for OoB here because we know ws isn't present at the end due to the `trimEnd()`ing in `s`'s creation
				}
				r = chomp_num(s, idx);
				//// = not a num
				if (r.chomps === 0) {
					r = chomp_op(s, idx);
					if (r.chomps === 0) {
						throw new Error();
					} else {
						qo = r.op;
						idx += r.chomps;
					}
				} else {
					switch (qo) {
						case Ops.ADD:
							total += r.num;
						break;
	
						case Ops.SUB:
							total -= r.num;
						break;
	
						case null:
						case Ops.MUL:
							total *= r.num;
						break;
	
						case Ops.DIV:
							total /= r.num;
						break;
	
						default:
							throw new Error();
					}
					idx += r.chomps;
				}
			}
			this.setState({
				total,
				op: null,
				current: null,
				is_float: false
			});
		}
		catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<div style={{borderStyle: "solid"}}>
				<div id="result_dpy"
				style={{
					borderStyle: "solid",
					width: "500px",
					overflow: "scroll",
					paddingLeft: "5px",
					paddingRight: "5px",
					color: "#4385c2"
			}}
				>
					{this.state.current || this.state.total || "_"}
				</div>
				<input onBlur={
					(event) => {
						this.i(event.target.value);
					}
				}>
				</input>
				<div id="cont_ops">
					<button 
					style={
						this.state.op === Ops.ADD
						? {opacity: "80%"}
						: {}
					}
					onClick={
						this.state.op === Ops.ADD
						? null
						: () => this.op(Ops.ADD)
					}>+</button>

					<button
					style={
						this.state.op === Ops.SUB
						? {opacity: "80%"}
						: {}
					}
					onClick={
						() => this.op(Ops.SUB)
					}>-</button>

					<button
					style={
						this.state.op === Ops.MUL
						? {opacity: "80%"}
						: {}
					}
					onClick={
						() => this.op(Ops.MUL)
					}>*</button>

					<button
					style={
						this.state.op === Ops.DIV
						? {opacity: "80%"}
						: {}
					}
					onClick={
						() => this.op(Ops.DIV)
					}>/</button>

					<button
					style={
						this.state.current
						? {}
						: {opacity: "50%"}
					}
					onClick={
						() => this.op(Ops.BACKSPACE)
					}>bksp</button>

					<button onClick={
						() => this.op(Ops.CLEAR)
					}>clr</button>

					<button onClick={
						() => this.op(Ops.ENTER)
					}>=</button>
				</div>

				<div style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gridTemplateRows: "1fr 1fr 1fr",
					}}>
					<button onClick={
						() => this.numpress(0)
					}>0</button>

					<button onClick={
						() => this.numpress(1)
					}>1</button>
							
					<button onClick={
						() => this.numpress(2)
					}>2</button>

					<button onClick={
						() => this.numpress(3)
					}>3</button>

					<button onClick={
						() => this.numpress(4)
					}>4</button>

					<button onClick={
						() => this.numpress(5)
					}>5</button>

					<button onClick={
						() => this.numpress(6)
					}>6</button>

					<button onClick={
						() => this.numpress(7)
					}>7</button>

					<button onClick={
						() => this.numpress(8)
					}>8</button>

					<button onClick={
						() => this.numpress(9)
					}>9</button>

					<button
						style={this.state.is_float
							? {display: "none"}
							: {}
						}
						onClick={
						this.state.is_float
						? null
						: () => this.decimalpoint()
					}>.</button>

					<button
						style={this.state.current
							? {display: "none"}
							: {}
						}
						onClick={
						this.state.current
						? null
						: () => this.setState({current: '-'})
					}>-</button>
				</div>
			</div>
		  );
	}
}