// In nodejs, whenever we write a piece of code that requires disc access or network access, it is asynchronous.
// How to deal with asynchronous code?


const id = 2;

getMovieFromDatabase(id)//can we attach then to any function ,NO only for those which return promise(asyn operation)
    .then(movie => getDirectorOfMovie(movie.name))
    .then(director => getNumberOfHitsForTheDirector(director.directorName))
    .then(hits => console.log(hits))
    .catch((ex) => console.log("Ex", ex));




//Get a movie from the DB
    //Then For the movie I will get its director
        //Then For the director, I will get the number of hits he has given

function getMovieFromDatabase(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log("Read the movie from the DB");
            resolve({id: id, name: "Lagaan", actor: "Aamir Khan"});
        }, 2000);
    });
}

function getDirectorOfMovie(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                console.log("Read the director for the movie from the DB");
                resolve({name: name, directorName: "Ashutosh"});
            }, 1000);
        });        
}

function getNumberOfHitsForTheDirector(director) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Read the hits for director from the DB");
            resolve({directorName: director, hits: 10});
        }, 1000);
    });

}
