class App extends React.Component {
    state = {
        name: String,
        img: String,
        description: String,
        products: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/products").then(
            (response) => {
                this.setState({products: response.data, name:"", img:"", description:""});
            }
        );
    }
    deleteProduct = (event) => {
        axios.delete("/products/" + event.target.value).then(
            (response) => {
                this.setState({
                    products: response.data,
                })
            }
        );
    }
    updateProduct = (event) => {
        event.preventDefault();
        const id = event.target.id;
        axios.put(`/products/${id}`).then((response) => {
            this.setState({
                products: response.data,
                name: "",
                img: "",
                description: ""
            })
        });
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
                <h4>Add Products</h4>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={this.handleChange} />
                    <br />
                    <label htmlFor="img">Image</label>
                    <input type="text" id="img" onChange={this.handleChange} />
                    <br />
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Add products" />
                </form>
                <h4>Products for sale</h4>
                <ul>
                    {this.state.products.map(
                        (product) => {
                            return (
                                <li key={product._id}>
                                    <img src={product.img} alt={product.name} />
                                    {product.name}
                                    <button value={product._id} onClick={this.deleteProduct}>DELETE</button>
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