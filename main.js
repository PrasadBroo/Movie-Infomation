const searchText = document.getElementById('searchText');
const submitBtn = document.querySelector('.submitBtn');
const outputMovies = document.querySelector('.outputMovies');
const loader = document.getElementById('loader');



submitBtn.addEventListener('click',loadMovies);


async function loadMovies(){
    loader.classList.remove('d-none');
    let searchValue = searchText.value;
    
    if(searchValue ==null || searchValue == ''){alert('Plz Enter Movie Name...:(');loader.classList.add('d-none'); return;}
    const data = await getMovieData(searchValue);
    if(data.Response == 'False'){outputMovies.innerHTML='<p class="text-light">Sorry No Movie Found . . .</p>';loader.classList.add('d-none');return;}
    

    let html_to_go = data.Search.map(ele => {
        if(ele.Poster == 'N/A'){ele.Poster = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'}
        let hmm = `<div class="card m-2" style="width: 18rem;">
        <img class="card-img-top" src=${ele.Poster}>
        <div class="card-body">
          <h5 class="card-title">${ele.Title}</h5>
          
          <a href="movie.html" class="btn btn-primary btn-full" id=${ele.imdbID}>View Info</a>
        </div>
    </div>`;
    return hmm;
    });

    loader.classList.add('d-none');
    outputMovies.innerHTML = html_to_go.join('');

    const movieBtns = document.querySelectorAll('.btn-full');
    movieBtns.forEach((moviebtn =>{
        moviebtn.addEventListener('click',()=>{
            sessionStorage.setItem('movieID',moviebtn.id);
        });
    }));
}

async function getMovieData(movieName){
    const res = await fetch(`http://www.omdbapi.com/?apikey=1a5ae6c4&s=${movieName}`);
    const data = await res.json();
    return data;
}

