window.onload = ()=>{
    const movieId = sessionStorage.getItem('movieID');
    if(movieId == '' || movieId == null){window.location = 'index.html';return;}
    getMovieInfo(movieId);
}


async function getMovieInfo(id){
    const data = await getMovie(id);
    if(data.Poster == 'N/A'){data.Poster = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'}
    let html_to_go = `<div class="container m-5 d-flex bg-dark p-5">
    <div class="my-img ">
        <img src=${data.Poster} class="card-img-top" alt=${data.Title}>
        <p>${data.imdbRating}/10</p>
        <div class="main-links">
            <a href="http://imdb.com/title/${id}" class="bg-info text-light" target="_blank" rel="noopener noreferrer">View On Imdb</a>
            <a href="index.html" class="bg-light go-back">Go Back</a>
        </div>
        
    </div>
    <div class="movie-info ml-5 ">
        <ul class="list-group">
            <li class="list-group-item "><b>Year:</b> ${data.Year}</li>
            <li class="list-group-item"><b>Rated:</b> ${data.Rated}</li>
            <li class="list-group-item"><b>Runtime:</b> ${data.Runtime}</li>
            <li class="list-group-item"><b>Released:</b> ${data.Released}</li>
            <li class="list-group-item"><b>Genre:</b> ${data.Genre}</li>
            <li class="list-group-item"><b>Director:</b> ${data.Director}</li>
            <li class="list-group-item"><b>Actors:</b> ${data.Actors}</li>
            <li class="list-group-item"><b>Language:</b> ${data.Language}</li>
            <li class="list-group-item"><b>Awards:</b> ${data.Awards}</li>
            <li class="list-group-item"><b>Plot:</b> ${data.Plot}</li>
            
        </ul>
    </div>
</div>`
    document.querySelector('title').textContent = data.Title;
    document.querySelector('.movie-result').innerHTML = html_to_go;
}


async function getMovie(id){
    const res = await fetch('http://www.omdbapi.com/?apikey=1a5ae6c4&i='+id);
    const data = await res.json();
    return data;
}
