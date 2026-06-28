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
    function Book(title, author, pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();

        // INITIALIZING READ VALUE
        this.read = true;
    }

    // PROTOTYPE TO TOGGLE READ STATUS AND INDICATE CHANGES
    Book.prototype.toggleRead = (book,card,readBtn) =>{
        book.read=!book.read;
        if(book.read == false){
            card.classList.add('bookUnread');
            readBtn.innerHTML = 'Unread';
        }
        else{
            card.classList.remove('bookUnread');
            readBtn.innerHTML = 'Read';
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
    addBookToLibrary('Whatever Happened to the Man of Tomorrow?','Alan Moore',40);
    addBookToLibrary('Saga of the Swamp Thing','Alan Moore',200);

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
        // CREATING DOM ELEMENTS
        const delBtn = document.createElement("button");
        const readBtn = document.createElement("button");

        // STYLE DELETE BUTTON
        delBtn.innerHTML = "Delete";
        delBtn.classList.add("button");

        // STYLE READ BUTTON
        readBtn.innerHTML = 'Read';
        readBtn.classList.add('button');

        // CREATE CARD AND MAIN CONTENT
        const card = document.createElement('div');        

        const title = document.createElement('h4');
        title.textContent = `${book.title}`;

        const author = document.createElement('p');
        author.textContent = `By ${book.author}`;

        const pages = document.createElement('h4');
        pages.textContent = `Pages: ${book.pages}`;

        // ADDING THE MAIN CONTENT
        card.append(title);
        card.append(author);
        card.append(pages);
        
        // ADDING THE DELETE BUTTON
        card.append(delBtn);

        // ADDING READ BUTTON TO CARD
        card.append(readBtn);

        // ADD EVENT LISTENER TO READ BUTTON
        readBtn.addEventListener('click',(e)=>{
            book.toggleRead(book,card,readBtn);
        })
        
        card.classList.add('insideCardContainer');
        container.append(card);
    
        // SETTING CARDS ATTRIBUTE TO BOOK ID
        card.setAttribute('data-id',book.id);
        
        // ADD EVENT LISTENER TO DELETE BUTTON
        delBtn.addEventListener("click",(e)=>{
            deleteBook(card);
            top -= 1;
            // DISPLAYING AFTER DELETING BOOK
            library.forEach(displayBooksToPage);
        })
    }

    // DISPLAYING AFTER DEFAULT BOOKS
    library.forEach(displayBooksToPage);

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
        displayBooksToPage(library[top]);
    })
})