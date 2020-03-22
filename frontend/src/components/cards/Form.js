import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCollections } from '../../actions/collections';
import { addCard } from '../../actions/cards';

export class Form extends Component {
    static propTypes = {
        collections: PropTypes.array.isRequired,
        getCollections: PropTypes.func.isRequired,
        addCard: PropTypes.func.isRequired
        //deleteCollection: PropTypes.func.isRequired
    }

    state = {
        name: '',
        number: '',
        description: '',
        collection: '',
        //user: '',
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        //this.state.user = "1";
        //console.log(this.state);

        
        const { name, number, description, collection } = this.state;
        const card = { name, number, description, collection };
        this.props.addCard(card);
        this.setState({
            name: '',
            number: '',
            description: '',
            collection: '',
        });
    }

    componentDidMount() {
        this.props.getCollections();
    }

    render() {
        const { name, number, description, collection } = this.state;
        return (
            <div className="card card-body col-4 mt-4 mb-4">
                <h1>Add Card</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>    
                        <input 
                            className="form-control" 
                            type="text" 
                            name="name" 
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number</label>    
                        <input 
                            className="form-control" 
                            type="number" 
                            name="number" 
                            onChange={this.onChange}
                            value={number}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>    
                        <input 
                            className="form-control" 
                            type="text" 
                            name="description" 
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Collection</label>  

                        
                        <select className="form-control" 
                            type="text" 
                            name="collection"
                            onChange={this.onChange}
                            value={collection} >
                            <option key={0} value=""> </option>
                        { this.props.collections.map(collection => (
                            
                            <option key={collection.id} value={collection.id}>{collection.name}</option>
                        
                        )) }
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collections: state.collections.collections
});

export default connect(mapStateToProps, { getCollections, addCard }) (Form);
