class App extends React.Component {
    state = {
        name: String,
        img: String,
        description: String,
        products: []
    }
    componentDidMount = () => {
        axios.get("/products").then((response) => {
            this.setState({
                products: response.data,
            })
        });
    }
    render = () => {
        return (
            <div>
                <h4>Products for sale</h4>
                <ul>
                    {this.state.products.map(
                        (product) => {
                            return (
                                <li key={product._id}>
                                    {product.name}
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        );
    }
};

ReactDOM.render(<App></App>, document.querySelector("main"));