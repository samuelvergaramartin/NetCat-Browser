document.addEventListener("DOMContentLoaded", function() {
    const url_search_button = document.getElementById('url_search_button');
    const search_button = document.getElementById('search_button');
    const return_home_button = document.getElementById('return_home_button');
    const new_window_new_home_button = document.getElementById('new_window_new_home_button');
    const url_input = document.getElementById('url_input');
    const search_input = document.getElementById('search_input');

    const main_container = document.getElementById('main_container');

    const routes = {
        loaderPage: "../windows/index.html",
        browserPage: "../windows/browser.html"
    
    };
    url_search_button.addEventListener('click', () => {
        const searchQuery = url_input.value;
        var searchUrl = `${searchQuery}`;

        if(!searchUrl.startsWith("https://") && !searchUrl.startsWith("http://")) {
            searchUrl = `https://search.tosdr.org/search?q=${encodeURIComponent(searchQuery)}&    categories=general&language=es-ES`;
        }

        if(!url_input.value || url_input.value == null || url_input.value == "") {
            return;
        }
        while (main_container.firstChild) {
            main_container.removeChild(main_container.firstChild);
        }

        const iframe = document.createElement("iframe");
        iframe.src = searchUrl;
        iframe.width = "100%";
        iframe.height = "985";

        main_container.appendChild(iframe);
    });

    search_button.addEventListener('click', () => {
    const searchQuery = search_input.value;
    const searchUrl = `https://search.tosdr.org/search?q=${encodeURIComponent(searchQuery)}&    categories=general&language=es-ES`;

     while (main_container.firstChild) {
        main_container.removeChild(main_container.firstChild);
    }

    const iframe = document.createElement("iframe");
    iframe.src = searchUrl;
    iframe.width = "100%";
    iframe.height = "985";

    main_container.appendChild(iframe);
});

return_home_button.addEventListener('click', ()=> {
    window.location.href = routes.browserPage;
})

new_window_new_home_button.addEventListener('click', ()=> {
    window.open(routes.browserPage, "_blank");
})

});