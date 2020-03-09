import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { searchValue: '' };
        this.handleSearchValue = this.handleSearchValue.bind(this);
    }

    handleSearchValue(event) {
        this.setState({ searchValue: event.target.value });
    }

    render() {
        const { searchValue } = this.state;
        return (
            <div>
                <TextField
                    style={{ width: 500 }}
                    margin="normal"
                    id="search"
                    type="search"
                    placeholder={this.props.placeholder}
                    value={searchValue}
                    onChange={this.handleSearchValue}
                    onKeyPress={(event) => event.key === 'Enter' && this.props.handleKeyPress(searchValue)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
        )
    }
}

export default Search;