//init tooltip
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      toolbarEnabled: true
    });
  });


//typewriter
class TypeWriter{
    constructor(txtElement, words, wait = 1000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type(){
        //current index of word
        let current = this.wordIndex % this.words.length;
        //get text of current word
        let fullTxt = this.words[current];
    
        //check if deleting state
        if(this.isDeleting){
            //remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            //add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    
        //insert txt into element
        this.txtElement.innerHTML = `
        <span class="txt">${this.txt}</span>
        `;
    
        //typespeed
        let typeSpeed = 150;
        
        if(this.isDeleting){
            typeSpeed /=2;
        }
    
        //if word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            //make pause at end
            typeSpeed = this.wait;
            //set is deleting
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === ""){
            this.isDeleting = false;
            //move to next word
            this.wordIndex++;
            //pause before start typing
            typeSpeed = 100;
        }
        
        setTimeout(() => {
            this.type();
        }, typeSpeed);
    }  
}
 
//init on dom load
document.addEventListener("DOMContentLoaded", init);

function init(){
    let txtElement =  document.querySelector(".txt-type");
    let words = JSON.parse(txtElement.getAttribute("data-words"));
    let wait = txtElement.getAttribute("data-wait");
    new TypeWriter(txtElement, words, wait);
}

//smooth scroll
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });