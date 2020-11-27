// In nodejs, whenever we write a piece of code that requires disc access or network access, it is asynchronous.
// How to deal with asynchronous code?


//Whenever u need to execute the promises independently
Promise.all([getUser(), getLatestMovie(), getTopRatedActor()]).then(result => {
    //You can perform an action  here after all 3 have executed
    console.log("All executed")
});

//This also executes the promises independently, but you cannot perform an action
//after all 3 have executed
getUser().then(_ => {});
getLatestMovie().then(_ => {});
getTopRatedActor().then(_ => {});

//if any one promise gets rejected, 


//gateway servers 
//flipkart - singapore, india, usa

//In  this case u can use Promise.race to get the fastest server


function getUser() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log("Read the user from the DB");
            resolve({ name: "Mrigank"});
        }, 2000);
    });
}

function getLatestMovie() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                console.log("Read the latest movie from the DB");
                resolve({name: "Laxmii"});
            }, 1000);
        });        
}

function getTopRatedActor() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Read the best actor from the DB");
            resolve({actor: "Vicky Kaushal"});
        }, 1000);
    });

}
