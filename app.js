const items = document.querySelector(".lists");
const searchBar = document.querySelector(".searchBar");
const container = document.querySelector(".container");

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
        container.insertAdjacentHTML('beforeend', ` 
        <div  class="lists" id="lists" id="${trip.eid}> 
            <div class="container-list">

                <div class="images-slide">
                    <div class="slide">
                            ${trip.photos.map(photo => {
                             return `<img src=${photo} alt="photo"/>
                            `
                            }).join('')}
                               
                    </div>  
                    <div class="contents">
                        <div class="content">
                            <div class="title">
                                <a href="${trip.title}"><h2>${trip.title}</h2><a>
                            </div>
                
                            <div class="description" id="module">
                                <p class="collapse" id="collapseId" aria-expanded="false">${trip.description}</p>
                                <a role="button" class="collapsed" data-toggle="collapse" href="${trip.url}" aria-expanded="false"> 
                                </a>
                            </div>

                            <div class="job-tag-box" >
                                <h5>หมวดหมู่: </h5>
                                <div id="dots">
                                    ${trip.tags.map(tag => {
                                    return `<div class="job-tag" data-value="${tag}"><p>${tag}<p></div>`
                                    }).join(',')}
                                </div>
                            </div>
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
            <div class="filter-tag">
                <p>${tag}</p>
            </div>
            <div class="filter-remove-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
           
        </div>

    `)
    
}







//remove tag from filter bar
const removefilterBox = (tag) => {
     document.querySelectorAll('filter-list-box').forEach(index => {
         console.log(index)
         if(index.getAttribute('data-value') == tag) index.remove();
         
     })
     console.log(tag)
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
    document.querySelectorAll('.lists')
        .forEach(index => index.classList.remove('marked'));
    document.querySelectorAll('.lists')
        .forEach(index => index.style.display = 'flex');
}


//color theme switch
function colorThemeChanger(){
    if(body.classList == 'light'){
        body.classList.remove('light')
        body.classList.add('dark')
        document.querySelector('.head-container').style.backgroundImage  = "url(./images/bg-header-desktop2.png)"
    } else {
        body.classList.remove('dark')
        body.classList.add('light')
        document.querySelector('.head-container').style.backgroundImage  = "url(./images/bg-header-desktop.png)"
    }
}

//storage
let store = [];

//job list bar
window.addEventListener('click', (e) => {
    const jobTagGroup = document.querySelectorAll('.job-tag-box');
    const filterTags = e.target.closest('.filter-list-box');
    const tagText = e.target.textContent.trim()





    //push tag to storage, which is filter list
    if(e.target.closest('.job-tag')){
        openFilterbox();
        //if the value to search for is never occurs return -1
        if(store.indexOf(tagText) == -1){
            createFilterBox(tagText)
            store.push(tagText)
        }else{
            removefilterBox(tagText);
            const storeIndex = store.indexOf(tagText)
            store.splice(storeIndex,1)

        }
   
       
    }

    //tag removal forfilter box
    if(filterTags){
        removefilterBox((filterTags.childNodes[1]).textContent);
        const storeIndex = store.indexOf(filterTags.childNodes[1].textContent)
        store.splice(storeIndex,1)
    

    }
  

    //joblist display controller
    jobTagGroup.forEach(index => {
        const jobListingContainer = index.closest('.lists')
        jobListingContainer.style.display = "none";

        //convert tags list into readable string arrays
        const tagArrays = index.textContent.replace(/\s+/g, ',').trim().split(',');

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
        const filterLists = document.querySelectorAll('.filter-list-box');

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
    
   //color theme changer
   if(e.target.classList[0] == 'color-switcher'){        
    colorThemeChanger();
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






