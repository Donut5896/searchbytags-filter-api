const items = document.querySelector(".lists");
const searchBar = document.querySelector(".searchBar");
const container = document.querySelector(".container");

let  searchTrips = [];





//fetch data from api
const loadTrips = async() => {
    try{
        const res = await fetch('https://trips-api-gateway.herokuapp.com/trips')
        searchTrips = await res.json();
        showTrips(searchTrips);
        
    }catch(err){
        console.log(err);
    }
}


//display data
const showTrips = (trips) => {
        const output =  trips.map(trip => {
        container.insertAdjacentHTML('beforeend', ` 
        <div  class="lists" id="${trip.eid}> 
            <div class="container-list">

                <div class="images-slide">
                   <div class="image-content">
                        <div class="slide">
                            ${trip.photos.map(photo => {
                            return `<img src=${photo} alt="photo"/>
                               
                            `  }).join('')} 
                        
                          <div class="overlay-content">
                                <span class="read-more"> <a href="${trip.url}" >read more</a></span>
                                <ul class="post-meta">
                                    <li class="meta-views">
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                    "1.7K views"</li>
                                    <li class="meta-reading-time"><i class="fa fa-clock-o" aria-hidden="true"></i>
                                    "2 minute read"</li>
                                </ul>
                               
                           </div>
                           
                        </div>    
                    </div>       
              
                  
                    <div class="contents">
                        <div class="content">
                            <div class="title">
                                <a href="${trip.title}"><h2>${trip.title}</h2><a>
                            </div>
                
                            <div class="description" id="module">
                                <p class="collapse" id="collapseId" aria-expanded="false">${trip.description}</p>
                                <button class="readMore-collapsed">
                                    <a role="button" class="collapsed" data-toggle="collapse" href="${trip.url}" aria-expanded="false">
                                    read more 
                                    </a>
                                </button>
                            </div>

                            <div class="job-tag-box" >
                                <h5>????????????????????????: </h5>
                                <div id="dots" >
                                    ${trip.tags.map(tag => {
                                    return `<div class="job-tag" data-value="${tag}"><p>${tag}<p></div>`
                                    }).join(',')}
                                </div>
                            </div>
                        </div> 
                    </div>  
                </div>     
            </div>
        </div>`
    )})
   
};


//create tag on filter bar
const createFilterBox = (tag) => {
    document.querySelector('.filter-lists').insertAdjacentHTML('beforeend', `
        <div class="filter-list-box"  data-value="${tag}">
            <div class="filter-tag" >
                <p >${tag}</p>
            </div>
            <div class="filter-remove-icon ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        </div> `)
}







//remove tag from filter bar
const removeFilterBox = (tag) => {
     document.querySelectorAll('.filter-list-box').forEach(trip => {
         if(trip.getAttribute('data-value') == tag) trip.remove();
      
     })    
}



//open and close effect
function openFilterBox(){
    document.querySelector('.filter-wrapper').style.transform= "translateY(-12.7rem) scaleY(1)"
    document.querySelector('.filter-wrapper').style.margin = "0 6rem"
}
function closeFilterBox(){
    document.querySelector('.filter-wrapper').style.transform = "translateY(-12.7rem) scaleY(0)"
}



//clear all
function clearAll(){
    document.querySelectorAll('.lists')
        .forEach(trip => trip.classList.remove('marked'));
    document.querySelectorAll('.lists')
        .forEach(trip => trip.style.display = 'flex');
}


   

//storage
let store = [];

//job list bar
document.addEventListener('click', (e) => {
    const jobTagGroup = document.querySelectorAll('.job-tag-box'); //?
    const filterTags = e.target.closest('.filter-list-box');
    const tagText = e.target.textContent.trim() 

  

    //push tag to storage, which is filter list
    if(e.target.closest('.job-tag')){
        openFilterBox();
        //if the value to search for is never occurs return -1
        if(store.indexOf(tagText) === -1){
            createFilterBox(tagText)
            store.push(tagText)
        }else{
            removeFilterBox(tagText);
            const storeIndex = store.indexOf(tagText)
            store.splice(storeIndex,1)
        }
   
        
    }

    //tag removal for filter box
    if(filterTags){
        removeFilterBox((filterTags.childNodes[1]).textContent.replace(/\s+/g," ").trim(''));
        const storeIndex = store.indexOf(filterTags.childNodes[1].textContent)
        store.splice(storeIndex,1 )
    }
  

    //job list display controller
    jobTagGroup.forEach(trip => {
        const jobListingContainer = trip.closest('.lists')
        jobListingContainer.style.display = "none";

        //convert tags list into readable string arrays
        let tagArrays = trip.textContent.replace(/\s+/g, ',').trim().split(',');
        tagArrays = tagArrays.filter(Boolean).slice(1) //?
        
       
        if(store.every(each => tagArrays.includes(each))){

        //store can be found on the first 'if condition' inside eventListener
            jobListingContainer.classList.add('marked');
            jobListingContainer.style.display = "flex";
            
        }else{
            jobListingContainer.classList.remove('marked')
        }
  
    })


    //clearAll button on filter bar
    if(e.target.closest('.filter-wrapper')){
        const filterLists = document.querySelectorAll('.filter-list-box');

        if(e.target.textContent == 'Clear'){
            filterLists.forEach(trip => trip.remove());
            store = [];
            clearAll();
        }
    
    }

    //check if filter box is empty
    if(store.length == 0){
        clearAll();
        closeFilterBox();
    }
    
  
})



loadTrips(); 































