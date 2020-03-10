import React, { Fragment } from 'react';
import AlignItemsList from '../components/List';


class MySearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = { listItem: [] };
    }

    componentDidMount() {
        const listItem = JSON.parse(localStorage.getItem("mySearch"));
        this.setState({
            listItem: [...listItem]
        })
    }

    render() {
        return (
            <Fragment>
                {this.state.listItem.map(item => (
                    <AlignItemsList item={item} key="item" />
                ))}
            </Fragment>
        );
    }
}

export default MySearch;