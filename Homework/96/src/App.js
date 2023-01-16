import Order from './Order.js';
import {Component} from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: undefined
		};
	}


	render() {
		console.log(this.state);
		return (
			<div>
				<button onClick={ () =>
					fetch("orders.json")
					.then(resp => resp.json())
					.then(orders_json => {
					this.setState({orders: orders_json.map(Order.deserialize)});
					})
				}>Load JSON</button>
				


				{
					this.state.orders
					?
						<pre>{
							this.state.orders.reduce(
								(dpy_text, order) => {
								return dpy_text + order + '\n\n';
							})
							.trimEnd()
						}</pre>
					:
						<p>no orders</p>
				}
			</div>)
		;
	}
}

export default App;