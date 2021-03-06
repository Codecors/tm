import React from 'react';
import Store from '../../store/store';
import {setSearchResults, setSearchPeople} from '../../actions/searchActions';
import {searchMulti, searchPerson} from '../../api/Search';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import {white, cyan500} from 'material-ui/styles/colors';

export default class searchBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.styles = {
            appBar: {
                backgroundColor: white
            },
            textField: {
                marginTop: 8
            }
        }
    }

    handleSearch = (event) => {
        if (event.target.value && event.target.value.replace(/\s/g, '').length) {
            Promise.all([
                searchMulti(event.target.value),
                searchPerson(event.target.value)
            ]).then((data) => {
                let [ multi, person ] = data;
                Store.dispatch(setSearchResults(multi));
                Store.dispatch(setSearchPeople(person));
            })
        } else {
            Store.dispatch(setSearchResults(null));
            Store.dispatch(setSearchPeople(null));
        }
    };

    render() {
        const {iconElementLeft, onLeftIconButtonTouchTap} = this.props;
        return (
            <AppBar
                title={<TextField
                    hintText="Search..."
                    style={this.styles.textField}
                    fullWidth={true}
                    underlineShow={false}
                    onChange={this.handleSearch}
                    autoFocus
                />}
                style={this.styles.appBar}
                iconElementLeft={iconElementLeft}
                onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
                iconElementRight={<IconButton><SearchIcon color={cyan500}/></IconButton>}
            />
        );
    }
}