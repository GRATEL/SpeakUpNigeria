const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}
//type method
TypeWriter.prototype.type = function() {
    
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fullTxt = this.words[current];

   // check if deleting
    if(this.isDeleting) {
        //remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    // Type Speed
    let typeSpeed = 300;
    if(this.isDeleting) {
        typeSpeed /=2;
    }
    // if word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        //make pause at end
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt ==='') {
        this.isDeleting = false;
        //move to the next word
        this.wordIndex++;
        //puse befor start typind
        typeSpeed =500;
    }

    setTimeout(() => this.type(),typeSpeed)
}
// Init On DOM LOAD
document.addEventListener('DOMContentLoaded',init);
//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init typeWriter
    new TypeWriter(txtElement, words, wait);
}