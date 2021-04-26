const items = document.querySelector(".lists");
const searchBar = document.querySelector(".searchBar");


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








 /*<div class="image-card">
                        <img src="${trip.photos[0]}" alt="" />
                 </div*/




//display data
const showTrips = (trips) => {
  
 
    let tripListingHTML =  trips.map(trip => {

        return (
         items.insertAdjacentHTML('beforeend', ` 
            <div class="container-list" id="${trip.eid}">

                   <div class="images-slide">
                            <div class="slide">
                                ${trip.photos.map(photo => {
                                    return `<img src="${photo}" />
                                  `
                                }).join('')}
                               
                            </div>  
                      
        

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

                        <div class="hashtags" >
                                    <h5>หมวดหมู่: </h5>
                                   <div id="dots">

                                    <span class="collapse_" id="collapseTag" aria-expanded="false">
                                    ${trip.tags.map(tag => {
                                        return `<div class="job-tag" data-value="${tag}"><p class="txt">${tag}<p></div>`
                                    })}
                                    </span>
                                    <a role="button" class="collapseDot" data-toggle="collapse" href="${trip.url}" aria-expanded="false"> 
                                    </div>
                            </a>
                        </div>

                     
                    </div> 
                </div>
                 
            </div>     
                 </div>`)
    )}).join('')

};


//create tag on filter bar
const createFilterBox = (tag) => {
    document.querySelector('.filter-lists').insertAdjacentHTML("beforeend", `
        <div class="filter-list-box"  data-value="${tag}">
            <div class="tabs">
                <p>${tag}</p>
            </div>
            <div class="filter-remove-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path fill="#fff" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/>
                </svg>
            </div>
           
        </div>

    `)
}

//remove tag from filter bar
const removefilterBox = (tag) => {
     document.querySelectorAll('filter-list-box').forEach(index => {
         if(index.getAttribute('data-value') == tag) index.remove();
     })
}



//open and close effect
function openFilterbox(){
    document.querySelector('.filter-wrapper').style.transform= "translateY(-3.5rem) scaleY(1)"
}
function closeFilterbox(){
    document.querySelector('.filter-wrapper').style.transform = "translateY(-3.5rem) scaleY(0)"
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
    const jobTagGroup = document.querySelectorAll('.hashtags');
    const filterTags = e.target.closest('.filter-list-box');
    const tagText = e.target.textContent.trim()

    console.log(jobTagGroup)
    console.log(filterTags)
    console.log(tagText)
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
        
        console.log(storeIndex)
    }
  

    //joblist display controller
    jobTagGroup.forEach(index => {
        const jobListingContainer = index.closest('.container-list')
        jobListingContainer.style.display = "none";

        //convert tags list into readable string arrays
        const tagArrays = index.textContent.replace(/\s+/g, ' ').trim().split(',');
        console.log(index)
        //store can be found on the first 'if condition' inside eventListener
        if(store.every(each => tagArrays.includes(each))){
            jobListingContainer.classList.add('marked');
            jobListingContainer.style.display = "flex";
            
        }else{
            jobListingContainer.classList.remove('marked')
        }
        console.log(jobListingContainer)
        console.log(tagArrays)
        
    });


    //clearAll button on filter bar
    if(e.target.closest('.filter-wrapper')){
        const filterLists = document.querySelectorAll('.filter-list-box');

        if(e.target.textContent == 'Clear'){
            filterLists.forEach(index => index.remove());
            store = [];
            clearAll();
        }
        console.log(filterLists)
    }

    //check if filter box is empty
    if(store.length == 0){
        clearAll();
        closeFilterbox();
    }

})









loadTrips();
























/* 1.create tags and append to searchtabs
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

*/






