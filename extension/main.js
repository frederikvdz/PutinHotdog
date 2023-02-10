
/// initial load
var images = document.getElementsByTagName('img')
var figures = document.getElementsByTagName('figures')

function hotdogify(elem){
   let textalt = elem.alt.toLowerCase();
   let src = elem.src.toLowerCase();
   let title = elem.title.toLowerCase();
   let fig = elem.closest('figure');
   let next = elem.nextElementSibling;
      if (textalt.includes("putin") || src.includes("putin") || title.includes("putin") || textalt.includes("poetin") || src.includes("poetin") || title.includes("poetin")){
         imgReplace(elem);
      }
      else if (!!fig){
         let caption = fig.querySelector('figcaption');
         if(!!caption){
            let captext = caption.textContent.toLowerCase();
            if (captext.includes("putin") || captext.includes("poetin")){
             imgReplace(elem);
            }
         }        
      }
      else if (!!next){       
         let textnext = next.textContent.toLowerCase();
            if (textnext.includes("putin") || textnext.includes("poetin")){
             imgReplace(elem);
            }
        
      }
}

function imgReplace(elem){
      elem.src = `${chrome.runtime.getURL("hotdog.jpg")}`
      elem.alt = 'Putin trying to find the guy who did this'
      elem.style.objectFit = 'cover';
      elem.srcset= "";
      let parent = elem.closest('picture');
         if (!!parent){
               let sources = parent.getElementsByTagName('source');
               for (elt of sources){
                    deleteDis(elt);
               }
         }
}

function deleteDis(elem){
   elem.remove();
}


for (elt of images){
   hotdogify(elt);
}

////// dynamic content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      let sources = document.getElementsByTagName('img');
      for (elt of sources){
            hotdogify(elt);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});

