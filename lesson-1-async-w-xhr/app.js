(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.onerror = function(error){
            requestError(err,'img');
        };
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 487871313476e5af6dfc3100a2692728d6f58fb8beb43b17d301663d832a5cb9');
        imgRequest.send();
        
        function addImage(){
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            
            if(data && data.results && data.results[0]){
                const firstImage = data.results[0];
                htmlContent = `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            }else{
                htmlContent = `<div class="error-no-image">No images avaiable</div>`;
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);            
        }
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.onerror = function (error){
            requestError(err,'artclies');
        }
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=61dcbc55d0084951acd83dc785a5b97a`);
        articleRequest.send();
        function addArticles() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);

            if(data.response && data.response.docs && data.response.docs.length > 1){
                htmlContent = 
                '<ul>' + 
                        data.response.docs.map(article => 
                            `<li class="article">
                            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                            <p>${article.snippet}</p>
                            </li>`).join('') 
                + '</ul>';
            } else{
                htmlContent = '<div class="error-no-article">No article avaiable</div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
    });
})();
