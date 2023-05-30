const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmQzYWU4MTk3NjM1Y2E1NjJhOTVkMTlhZjRjNzU2OSIsInN1YiI6IjY0NzA4YTU3NzI2ZmIxMDE0NGU2MTJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bz2mDHlnt79GJtDyUzp6KDhdGGIPO4fesNEtdDYhf98'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then((response) => {
    let rows = response['results']
    let container = document.getElementById('card-list');

    rows.forEach((a) => {
      let title = a['original_title'];
      let poster = a['poster_path']; 
      let rate = a['vote_average'];
      let overview = a['overview']
      
      let temp_html = `<div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500/${poster}"
                        <br>
                        <h3>${title}</h3>
                        <p>${rate}</p>
                        <p>${overview}</p>
                      </div>`
      container.innerHTML += temp_html
      // container.appendChild(temp_html);  document.createElement가 없는 것과 관련이 있는 것 같은데 정확히는 모르겠음.
    }) 
  })
  .catch(err => console.error(err));

