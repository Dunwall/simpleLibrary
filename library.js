document.addEventListener("DOMContentLoaded",function(){
    const library = [];
    // DOM elements
    const container = document.querySelector("#cardContainer");
    const form = document.querySelector("#inputForm");
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#title");
    const readInput = document.querySelector("#readStatus");


    function Book(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = readStatus;
        this.id = crypto.randomUUID();
    }

    function addBookToLibrary(title,author,pages,readStatus){
        library.push(new Book(title,author,pages,readStatus));
    }

    addBookToLibrary('Watchmen','Alan Moore',420,'Yes');
    addBookToLibrary('Whatever Happened to the Man of Tomorrow?','Alan Moore',420,'Yes');
    addBookToLibrary('Saga of the Swamp Thing','Alan Moore',420,'Yes');

    function addBooksToPage(book){
            
        const newDiv = document.createElement('div');
            
        const title = document.createElement('h3');
        title.textContent = `${book.title}`;

        // const author = document.createElement('h3');
        // author.textContent = 'Author';

        const authorValue = document.createElement('p');
        authorValue.textContent = `By ${book.author}`;

        const pages = document.createElement('h3');
        pages.textContent = 'Pages';

        const pagesValue = document.createElement('p');
        pagesValue.textContent = `${book.pages}`;

        const readStatus = document.createElement('h3');
        readStatus.textContent = 'Read Yet';

        const readValue = document.createElement('p');
        readValue.textContent = `${book.read}`;

        newDiv.append(title);
        // newDiv.append(author);
        newDiv.append(authorValue);
        newDiv.append(pages);
        newDiv.append(pagesValue);
        newDiv.append(readStatus);
        newDiv.append(readValue);
        newDiv.classList.add('insideCardContainer');
        container.append(newDiv);
    }
    library.forEach(addBooksToPage);


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = pagesInput.value;
        let readStat = readInput.value;
        addBookToLibrary(title,author,pages,readStat);
        form.reset();
        for(let i=3;i<library.length;i++){
            addBooksToPage(library[i]);
        }
    })
})