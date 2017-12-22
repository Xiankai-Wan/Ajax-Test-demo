/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        function addImage(images) {
            const firstImage = images.results[0];

            responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
            );
        }
        $.ajax({
            url:`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers:{
                Authorization:'Client-ID 487871313476e5af6dfc3100a2692728d6f58fb8beb43b17d301663d832a5cb9'
            }
        }
        ).done(addImage);
        function addArticles(article) {
            responseContainer.insertAdjacentHTML('beforeend', '<ul>' +
                article.response.docs.map(a =>
                    `<li class="article">
                            <h2><a href="${a.web_url}">${a.headline.main}</a></h2>
                            <p>${a.snippet}</p>
                            </li>`).join('')
                + '</ul>');
        }
        $.ajax(
            {
                url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=61dcbc55d0084951acd83dc785a5b97a`,  
            }
        ).done(addArticles);
    });
})();
