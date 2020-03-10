const AlbumService = {
    getByAlbum: (term) => {
        let params = {
            "method": "album.search",
            "album": term,
            "api_key": "c25f4e84fae4de5c2bdccf626c45a9d6",
            "format": "json",
        };

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        let url = `http://ws.audioscrobbler.com/2.0/?${query}`;

        return fetch(url, { method: "GET" }).then(res => res.json());
    },
};

export default AlbumService;