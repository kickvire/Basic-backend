//Intro of synchronous and asynchronous through setTimeout
console.log('a');
setTimeout(()=>{console.log('c')},5000);
console.log('b');

//Problem of asynchronous code:Movie is undefined 
//console.log("Hello");
// const movie=getMovieFromDb(1);
// console.log(movie);//movie=undefined,thats the main problem
// //our target is to log the movie after the asynchronous operation

// function getMovieFromDb(id){
//     setTimeout(()=>{
//     console.log("Read Movie from database");
//     return {id:id,name:"Lagaan",actor:"Aamir khan",}
// },2000)
// }

//Solutions: Callback and promise:Pattern to deal with asynchronous
//1. Callback
console.log("Hello");
getMovieFromDb(1,function(movie){
     getDirectorName(movie.name,function(director){
         getDirectorHit(director.directorName,function(hit){
             console.log(hit);
         })
})
});

function getMovieFromDb(id,callback){
    setTimeout(()=>{
      console.log("Read Movie from database");
       callback({id:id,name:"Lagaan",actor:"Aamir khan",})
},2000);
}

function getDirectorName(name,callback){
    setTimeout(()=>{
     console.log("Read director name from database");
      callback({name:name,directorName:"Ashutosh"})
},2000);
}

function getDirectorHit(director,callback){
    setTimeout(()=>{
     console.log("Read no of Hit");
      callback({directorName:director,hit:10})
},2000);
}
//Problem:-Callbackhell:-nested callback functin,hard to maintain
