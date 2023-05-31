const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmQzYWU4MTk3NjM1Y2E1NjJhOTVkMTlhZjRjNzU2OSIsInN1YiI6IjY0NzA4YTU3NzI2ZmIxMDE0NGU2MTJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bz2mDHlnt79GJtDyUzp6KDhdGGIPO4fesNEtdDYhf98'
  }
};

// 영화 아이디 알럿 function
function alertID(id) {
  alert('영화 ID: ' + id);
}

function getMovies() {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then((response) => {
      let rows = response['results']; //배열로 가공하는 작업이래. 구체적으로 response배열에서 result키를 가진 애들만 추려서 rows로 만들어.
      let container = document.getElementById('card-list');  // container를 사용하여 화면에서 영화 카드를 표시할 HTML요소를 찾음. 우리는 section에 넣고 싶었고 그것의 id가 card-list인거임.
      container.innerHTML = ''; // 기존에 HTML에서 보여지고 있던 movie-card를 제거

      //검색창은 forEach돌리기 전에 filter. filter는 리턴문으로 끝나며 리턴문에 조건문을 걸 수 있는데 그 때 star with 내지 includes로 걸 수 있다.
      const getMoviesByKeyword = function(keyword) {
        let filtered = rows.filter(row => row.original_title.toLowerCase().includes(keyword));

        filtered.forEach((a) => {
          let title = a['original_title'];
          let poster = a['poster_path']; 
          let rate = a['vote_average'];
          let overview = a['overview'];
          let id = a['id'];
                                                    // 온클릭 하면 아이디 알럿 function 실행
          let temp_html = `<div class="movie-card" onclick="alertID('${id}')">
                            <img src="https://image.tmdb.org/t/p/w500/${poster}">
                            <br>
                            <h3>${title}</h3>
                            <p>${rate}</p>
                            <p>${overview}</p>
                            <p>${keyword}</p>
                          </div>`;
          container.innerHTML += temp_html;
          // body.appendChild(temp_html);  아래 appendChild처럼 사용이 안됨.
          // container.appendChild(temp_html);  document.createElement가 없는 것과 관련이 있는 것 같은데 정확히는 모르겠음.
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
      getMoviesByKeyword(''); // 초기에는 모든 영화를 보여줌. ''가 const getMoviesByKeyword = function(keyword)의 keyword에 들어가거든.
    })
    .catch(err => console.error(err));
}

// 페이지가 로드될 때 영화 정보를 가져와서 보여줌(getMovies->getMoviesByKeyword(''))
window.addEventListener('load', getMovies);


