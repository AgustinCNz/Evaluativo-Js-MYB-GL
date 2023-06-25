// Aquí puedes colocar la función filterMovies que definimos anteriormente
function filterMovies({ users, movies, userId }) {
    // Filtrar el usuario con el userId proporcionado
    const user = users.find(user => user.id === userId);
    if (!user) {
      console.log('No se encontró el usuario con el userId especificado');
      return [];
    }
  
    // Filtrar las películas vistas por el usuario
    const userMovies = movies.filter(movie => movie.userId === userId);
  
    // Crear un nuevo arreglo de objetos con la información requerida
    const filteredMovies = userMovies.map(movie => ({
      id: user.id,
      username: user.username,
      email: user.email,
      fullAddress: `${user.address.street} - ${user.address.city}`,
      company: user.company.name,
      movie: movie.title,
      rate: movie.rate
    }));
  
    return filteredMovies;
  }

// Obtener referencias a los elementos HTML
const userIdInput = document.getElementById('userId');
const searchBtn = document.getElementById('searchBtn');
const moviesTableBody = document.querySelector('#moviesTable tbody');

// Función para renderizar los datos en la tabla
function renderMoviesTable(movies) {
  // Limpiar la tabla antes de renderizar los nuevos datos
  moviesTableBody.innerHTML = '';

  // Iterar sobre los objetos de películas y crear las filas de la tabla
  movies.forEach(movie => {
    const row = document.createElement('tr');

    // Crear las celdas y asignar los valores correspondientes
    const idCell = document.createElement('td');
    idCell.textContent = movie.id;
    row.appendChild(idCell);

    const usernameCell = document.createElement('td');
    usernameCell.textContent = movie.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = movie.email;
    row.appendChild(emailCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = movie.fullAddress;
    row.appendChild(addressCell);

    const companyCell = document.createElement('td');
    companyCell.textContent = movie.company;
    row.appendChild(companyCell);

    const movieCell = document.createElement('td');
    movieCell.textContent = movie.movie;
    row.appendChild(movieCell);

    const rateCell = document.createElement('td');
    rateCell.textContent = movie.rate;
    row.appendChild(rateCell);

    // Agregar la fila a la tabla
    moviesTableBody.appendChild(row);
  });
}

// Listener del botón de búsqueda
searchBtn.addEventListener('click', () => {
  const userId = parseInt(userIdInput.value);
  
  // Llamar a la función filterMovies con los parámetros necesarios
  const filteredMovies = filterMovies({ users, movies, userId });

  // Renderizar los resultados en la tabla
  renderMoviesTable(filteredMovies);
});