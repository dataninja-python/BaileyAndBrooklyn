class App extends React.Component {
    handleSeed() {
        this.props.history.push("/products/seed");
    }
    render = () => {
        return (
            <div>
                <h4>Products for sale</h4>
                <button type="button" onClick={()=>this.handleSeed()}>Seed</button>
            </div>
        );
    }
};

ReactDOM.render(<App></App>, document.querySelector("main"));