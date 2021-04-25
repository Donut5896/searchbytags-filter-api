const items = document.querySelector(".lists");
const searchBar = document.querySelector(".searchBar");
const searchTabs = document.querySelector(".searchTag");

let  searchTrips = [];



//alternative fetch api to get data 
/*async function fetchTrip(){
    const response = await fetch("https://trips-api-gateway.herokuapp.com/trips");
    const trips = await response.json();
     showTrips(trips)
}
fetchTrip()
.then(response => {
    console.log("success")
})
.catch(error => {
    console.log('error');
    console.log(error);
})*/



/*//searchBar filter 
function searchText(){

searchBar.addEventListener("keyup", e => {
    const searchString = e.target.value;

    const filteredTrips =  searchTrips.filter(trip => {  
    return (
        trip.title.includes(searchString) ||
        trip.description.includes(searchString)||
        trip.tags.includes(searchString)
    );
    
});
    showTrips(filteredTrips);
   
})
}

*/



//fetch data from api
const loadTrips = async() => {
    try{
        const res = await fetch("https://trips-api-gateway.herokuapp.com/trips");
        
        searchTrips = await res.json();
       
        showTrips(searchTrips);

 

    }catch(err){
        console.log(err);
    }

 


};













//display data
const showTrips = (trips) => {
  
 
    let tripListingHTML =  trips.map(trip => {

        return (
         items.insertAdjacentHTML('beforeend', ` 
            <li class="container-list" id="${trip.id}">
                 <div class="image-card">
                    <img src=${trip.photos[0]} alt="" />
                 </div
                <div class="contents">
                    <div class="content">
                        <div class="title">
                            <h2>${trip.title}</h2>
                        </div>
               
                        <div class="description" id="module">
                            <p class="collapse" id="collapseId" aria-expanded="false">${trip.description}</p>
                            <a role="button" class="collapsed" data-toggle="collapse" href="${trip.url}" aria-expanded="false"> 
                            </a>
                        </div>

                        <div class="hashtags" id="hashtags">
                            <h5>หมวดหมู่: </h5>
                            <span class="tag" id="dots">
                                <div class="collapse_ " id="collapseTag"> 
                                    ${trip.tags.map(tag => {
                                        return `<div class="job-tag" data-value="${tag}">${tag}</div>`
                                    }).join('')}
                                </div>
                            </span>
                        </div>

                        <div class="images-slide">
                            <div class="slide">
                                <img src=${trip.photos[1]} />
                                <img src=${trip.photos[2]} />
                                <img src=${trip.photos[3]} />
                            </div>  
                        </div>
                    </div> 
                </div>
            </li>`)
    )}).join('')

//items.innerHTML = tripListingHTML;

};



//create tag on filter bar
const createFilterBox = (tag) => {
    document.querySelector('.filter-lists').insertAdjacentHTML("beforeend", `
        <div class="filter-list-box" data-value="${tag}">
            <div class="filter-tag">
                <p>${tag}</p>
            </div>
            <div class="cancel">
            </div>
        </div>    

    `)
}

//remove tag from filter bar
const removefilterBox = (tag) => {
     document.querySelectorAll('filter-list-box').forEach(index => {
         if(index.getAttribute('data-value') == tag)
          index.remove();
     })
}



//open and close effect
function openFilterbox(){
    document.querySelector('.searchTag').style.transform= "translateY(-3.5rem) scaleY(1)"
}
function closeFilterbox(){
    document.querySelector('.searchTag').style.transform = "translateY(-3.5rem) scaleY(0)"
}


//clear all
function clearAll(){
    document.querySelectorAll('.container-list')
        .forEach(index => index.classList.remove('marked'));
    document.querySelectorAll('.container-list')
        .forEach(index => index.style.display = 'flex');
}


//storage
let store = [];

//job list bar
window.addEventListener('click', (e) => {
    const jobTagGroup = document.querySelectorAll('.collapse_ ');
    const filterTags = e.target.closest('.filter-list-box');
    const tagText = e.target.textContent.trim()

    //push tag to storage, which is filter list
    if(e.target.closest('.job-tag')){
        openFilterbox();
        if(store.indexOf(tagText) == -1){
            createFilterBox(tagText)
            store.push(tagText)
        }else{
            removefilterBox(tagText);
            const storeIndex = store.indexOf(tagText)
            store.splice(storeIndex, 1)
        }
    }

    //tag removal forfilter box
    if(filterTags){
        removefilterBox((filterTags.childNodes[1]).textContent);
        const storeIndex = store.indexOf(filterTags.childNodes[1].textContent)
        store.splice(storeIndex, 1)
    }


    //joblist display controller
    jobTagGroup.forEach(index => {
        const jobListingContainer = index.closest('.container-list')
        jobListingContainer.style.display = "none";

        //convert tags list into readable string arrays
        const tagArrays = index.textContent.replace(/\s+/g, ' ').trim().split(' ');

        //store can be found on the first 'if condition' inside eventListener
        if(store.every(each => tagArrays.includes(each))){
            jobListingContainer.classList.add('marked');
            jobListingContainer.style.display = "flex";
        }else{
            jobListingContainer.classList.remove('marked')
        }
    });


    //clearAll button on filter bar
    if(e.target.closest('.filter-wrapper')){
        const filterLists = documnet.querySelectorAll('.filter-list-box');

        if(e.target.textContent == 'Clear'){
            filterLists.forEach(index => index.remove());
            store = [];
            clearAll();
        }
    }

    //check if filter box is empty
    if(store.length == 0){
        clearAll();
        closeFilterbox();
    }

})









loadTrips();




// buttonTags.forEach( (item) => {
//             const button = document.createElement("button");
//             button.innerHTML = item;
//             items.appendChild(button);

      
//            button.addEventListener("click", (e) => {
//             items.innerHTML = "";
//             const targetText = e.target.innerHTML;
//             filterTags.push(targetText);

//             //array for clicked tags 
//             filterTags = [...new Set(filterTags)];
        
//             setTripList(filterTags);
           
//         }) 
        
        
      
//     })









/*//3.filter job list
function setTripList(filter){
      if(!filter || !filter.length){
          items.innerHTML = "";
          return searchTrips.forEach((item) => {
              return showTrips(item);  
          })
       
      }else if(filter){
        filter.forEach((word) => {
            items.innerHTML = "";
            setTabs(filter);
            return  searchlocation(word).forEach( (item)=> {
                return[...new Set (showTrips(item))];
                      
            });
          
        });
  
    }
  
}







//2.set tab based on each input

function setTabs(tab){
      console.log(tab)
    searchTabs.innerHTML = "";
    return tab.forEach((item) => {
        createTaps(item)
    })
  
}



setTripList();


// 1.create tags and append to searchtabs
function createTaps(item){
    const tabEl = document.createElement("div");
    tabEl.classList.add("tabs");

    //create tab 
    const para = document.createElement("p");
    para.innerHTML = item;
    tabEl.appendChild(para);

    //create remove button
    const button = document.createElement("button");
    const cancleEl = document.createElement("div");
    cancleEl.classList.add("cancel");
    button.appendChild(cancleEl);
    tabEl.appendChild(button);

    //remove function
    button.addEventListener("click", (e) => {
        let text = e.target.closest(".tabs").querySelector("p").textContent;
        console.log(text)
        tabEl.remove();
        return setTripList(ccc(text));
    })
  //append tab to searchtag bar
    return [searchTabs.appendChild(tabEl)];
}




function ccc(text){
    filterTags = filterTags.filter((item) => {
        if(item != text){
            return item
        }
   
    }) 
    return [...filterTags];
 
}




function searchlocation(word){
   
    searchTrips = searchTrips.filter((item) => {
        if(
             item.tags.includes(word)
        ){
            return item
            console.log(item);
        }
    })
    return searchTrips
   
}


*/