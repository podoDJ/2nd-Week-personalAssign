const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmQzYWU4MTk3NjM1Y2E1NjJhOTVkMTlhZjRjNzU2OSIsInN1YiI6IjY0NzA4YTU3NzI2ZmIxMDE0NGU2MTJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bz2mDHlnt79GJtDyUzp6KDhdGGIPO4fesNEtdDYhf98'
  }
};

function getMovies() {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then((response) => {
      let rows = response['results']; //배열로 가공하는 작업.
      let container = document.getElementById('card-list');
      container.innerHTML = ''; // 기존에 HTML에서 보여지고 있던 movie-card를 제거

      //검색창은 forEach돌리기 전에 filter. filter는 리턴문으로 끝나며 리턴문에 조건문을 걸 수 있는데 그 때 start with 내지 includes로 걸 수 있다.!!
      const getMoviesByKeyword = function(keyword) {
        let filtered = rows.filter(row => row.original_title.toLowerCase().includes(keyword));

        filtered.forEach((a) => {
          let title = a['original_title'];
          let poster = a['poster_path']; 
          let rate = a['vote_average'];
          let overview = a['overview'];
          let id = a['id'];
                                                    
          let temp_html = `<div class="movie-card" onclick="alert('${id}')">
                            <img src="https://image.tmdb.org/t/p/w500/${poster}">
                            <br>
                            <h3>${title}</h3>
                            <p>${rate}</p>
                            <p>${overview}</p>
                            <p>${keyword}</p>
                          </div>`;
          container.innerHTML += temp_html; //temp_html은 애초에 DOM이 아니고 문자열이기 때문에 appendChild가 안됨.. createElement를 이용해서 노드를 만들어야 한다. innerHTML은 string이어도 노드를 만들어줌.

        });
      };

      const searchMovies = function() {
        let keyword = document.getElementById("search-input").value.toLowerCase();
        container.innerHTML = ''; // 검색 이전에 보여지고 있는 movie-card를 제거
        getMoviesByKeyword(keyword);
      };

      let searchButton = document.getElementById("search-button");
      searchButton.addEventListener("click", searchMovies);

      // 페이지가 로드될 때 영화 정보를 가져와서 보여줌
      getMoviesByKeyword(''); // 초기에는 모든 영화를 보여줌.
    })
    .catch(err => console.error(err));
}

// 페이지가 로드될 때 영화 정보를 가져와서 보여줌(getMovies->getMoviesByKeyword(''))
window.addEventListener('load', getMovies);

//대문을 누르면 다시 초기화
const headerTitle = document.querySelector("#header-title")
headerTitle.addEventListener('click', getMovies)
console.log(headerTitle)


