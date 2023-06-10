export function loadAPIMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzEzZWQ3NzcwZDViYzBlY2NmOTE4MWEzNDQxOGYyMiIsInN1YiI6IjY0ODNhNTE4ZTI3MjYwMDBlOGMwMmY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4jgvr5jqD0GyGGFGxkh4A_NrZHPN7Mdx2EEtapjlIoE'
      }
    };
  
    return fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        const movies = response.results;
        return movies;
      })
      .catch(err => console.error(err));
  }

export function loadAPIUpcoming() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzEzZWQ3NzcwZDViYzBlY2NmOTE4MWEzNDQxOGYyMiIsInN1YiI6IjY0ODNhNTE4ZTI3MjYwMDBlOGMwMmY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4jgvr5jqD0GyGGFGxkh4A_NrZHPN7Mdx2EEtapjlIoE'
      }
    };
  
    return fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => {
        const movies = response.results;
        return movies;
      })
      .catch(err => console.error(err));
  }