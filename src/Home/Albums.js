import React from 'react';
import Search from '../components/Search';
import Api from "../Services/Albums";
import BarGridList from "../components/GridList"

class Albums extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [] };

        localStorage.setItem("mySearch", JSON.stringify([]))
        this.searchAlbums = this.searchAlbums.bind(this);
    }

    saveSearch(term) {
        const storedSearch = JSON.parse(localStorage.getItem("mySearch"));
        storedSearch.push(term)
        localStorage.setItem("mySearch", JSON.stringify(storedSearch));
    }

    searchAlbums(term) {
        this.saveSearch(term);

        Api.getByAlbum(term).then(({ results }) => {
            const data = results && results.albummatches && results.albummatches.album

            if (!data) return

            const list = data.map(album => {
                return {
                    name: album.name,
                    url: album.url,
                    image: Object.values(album.image[3], "#text")
                }
            })
            this.setState({
                items: [...list]
            })
        }).catch((error) => error && this.setState({
            items: []
        }));
    }

    render() {
        return (
            <div>
                <Search placeholder="Digite o álbum e aperte enter para pesquisar..."
                    handleKeyPress={this.searchAlbums}
                />
                <React.Fragment>
                    <BarGridList data={this.state.items}></BarGridList>
                </React.Fragment>
            </div>
        )
    }
}

export default Albums;