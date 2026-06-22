document.addEventListener("DOMContentLoaded",(event)=>{
    const myLibrary = [];

    function Book(title,author,pages,haveRead){
        if(!new.target){
            console.log("Can't create this without an object mate.");
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
        this.id = crypto.randomUUID();
        // this.info = function(){
        //     console.log(title+" by "+author+", "+pages+" pages"+", "+haveRead);
        //     }
    }

    function addToLibrary(Book, title, author, pages, haveRead){
        let book = new Book(title, author, pages, haveRead);
        myLibrary.push(book);
    }

    function displayBooks(){
        for(const book of myLibrary){
            for(const info in book){
                console.log(`${info}:${book[info]}`)
            }
        }
    }

    addToLibrary(Book, 'The Brothers Karamazov','Fyodor Dostoevsky',600,'Not Yet');
    addToLibrary(Book, 'War and Peace','Leo Tolstoy',6000,'Not Yet');
    addToLibrary(Book, 'Lord of the Flies','Willen Golding',1000,'Not Yet');

    console.table(myLibrary);
    displayBooks();


});