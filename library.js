document.addEventListener("DOMContentLoaded",(event)=>{

    // BOOK ADDITION LOGIC
    const myLibrary = [];
    const cardContainer = document.getElementById('cardContainer');

    function Book(title,author,pages,haveRead){
        if(!new.target){
            console.log("Can't create this without an object mate.");
        }
        this.Title = title;
        this.Author = author;
        this.Pages = pages;
        this.HaveRead = haveRead;
        this.Id = crypto.randomUUID();
    }

    function addToLibrary(Book, title, author, pages, haveRead){
        let book = new Book(title, author, pages, haveRead);
        myLibrary.push(book);
    }

    function createText(a){
        return document.createTextNode(a);
    }

    // DISPLAYING BOOKS TO DOCUMENT
    function displayBooks(){
        for(const book of myLibrary){
            const insideCardContainer = document.createElement('div');
            for(const info in book){
                console.log(`${info}:${book[info]}`);
                text = createText(`${info}: ${book[info]}`);
                const newDiv = document.createElement('div');
                newDiv.append(text);
                newDiv.classList.add('card');
                insideCardContainer.append(newDiv);
            }
            cardContainer.append(insideCardContainer);
        }
    }

    addToLibrary(Book, 'The Brothers Karamazov','Fyodor Dostoevsky',600,'Not Yet');
    addToLibrary(Book, 'War and Peace','Leo Tolstoy',6000,'Not Yet');
    addToLibrary(Book, 'Lord of the Flies','Willen Golding',1000,'Not Yet');

    console.table(myLibrary);
    displayBooks();
});