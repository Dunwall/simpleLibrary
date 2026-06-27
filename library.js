document.addEventListener("DOMContentLoaded",function(){
    const library = [];
    // DOM elements
    const container = document.querySelector("#cardContainer");
    const form = document.querySelector("#inputForm");
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    var top = -1;
    // CONSTRUCTOR FOR CREATING BOOK OBJECTS
    function Book(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();
        Book.prototype.toggleRead = () =>{
            this.read = !this.read
        }
    }

    // FUNCTION TO ADD OBJECTS TO LIBRARY
    function addBookToLibrary(title,author,pages){
        const book = new Book(title,author,pages);
        library.push(book);
        top+=1;
    }

    // DEFAULT BOOKS ADDED
    addBookToLibrary('Watchmen','Alan Moore',420);
    addBookToLibrary('Whatever Happened to the Man of Tomorrow?','Alan Moore',420);
    addBookToLibrary('Saga of the Swamp Thing','Alan Moore',420);

    // FUNCTION TO DELETE BOOK OBJECT FROM THE ARRAY
    function deleteBook(card){
        let cardId = card.dataset.id;
        for(const book of library){
            if(cardId === book.id){
                console.log(book.id);
                const index = library.indexOf(book);
                if(index>-1){
                    library.splice(index,1);
                }
            }
        }
    }

    // DISPLAY BOOKS TO THE DOCUMENT
    function displayBooksToPage(book){
        // BUTTON FOR REMOVING BOOKS
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.classList.add("button");

        const card = document.createElement('div');        

        const title = document.createElement('h4');
        title.textContent = `${book.title}`;

        const author = document.createElement('p');
        author.textContent = `By ${book.author}`;

        const pages = document.createElement('h4');
        pages.textContent = 'Pages';

        const pagesValue = document.createElement('p');
        pagesValue.textContent = `${book.pages}`;

        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(pagesValue);
        card.classList.add('insideCardContainer');

        container.append(card);
        card.append(delBtn);

        card.setAttribute('data-id',book.id);
        delBtn.addEventListener("click",(e)=>{
            deleteBook(card);
            top -= 1;
            // DISPLAYING AFTER DELETING BOOK
            library.forEach(displayBooksToPage);
        })
    }
    // DISPLAYING AFTER DEFAULT BOOKS
    library.forEach(displayBooksToPage);
    
    // var counter = library.length;
    // EVENT LISTENER FOR WHEN FORM IS SUBMITTED
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = pagesInput.value;
        console.log(title);
        console.log(author);
        console.log(pages);
        addBookToLibrary(title,author,pages);
        form.reset();

        // DISPLAYING AFTER ADDING A BOOK
        // for(let i=counter;i<library.length;i++){
        displayBooksToPage(library[top]);
        // }
        // counter+=1;
    })
})