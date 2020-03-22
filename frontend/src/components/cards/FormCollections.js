import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCollection, getCollections } from '../../actions/collections';

export class FormCollection extends Component {
    static propTypes = {
        collections: PropTypes.array.isRequired,
        getCollections: PropTypes.func.isRequired,
        addCollection: PropTypes.func.isRequired
        //deleteCollection: PropTypes.func.isRequired
    }

    state = {
        name: '',
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        console.log('submit');
        
        const { name } = this.state;
        const collection = { name };
        
        console.log(this.state);
        console.log(collection);
        
        this.props.addCollection(collection);
        this.setState({
            name: '',
        });
        
    }
    /*
    componentDidMount() {
        this.props.getCollections();
    }
    */
    render() {
        const { name } = this.state;
        return (
            <div className="card card-body col-4 mt-4 mb-4">
                <h1>Add Collection</h1>
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

export default connect(mapStateToProps, { addCollection, getCollections }) (FormCollection);
