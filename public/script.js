document.addEventListener('DOMContentLoaded',()=>{
    axios.get('/getIssuedBooks')
    .then(books=>{
        showIssuedBooks(books.data)
    })
    .catch(err=>console.log(err));
    document.getElementById('bookEntry').addEventListener('submit',e=>{
        if(document.querySelector('.book-input').value==''){
            e.preventDefault()
            alert('Please Enter Book Title');
        }
    })
})

function showIssuedBooks(books){
    for(let book of books){
        if(!book.returnedOn){
            let currentTime = Date.now();
            let totalTime = ((new Date(currentTime))-(new Date(book.returnBy)))/3600000;
            let hrsOd=0;
            if(totalTime>0){
                hrsOd=Math.floor(totalTime)+1;
            }
            let fineAmount = hrsOd*10;
            let article = document.createElement('article');
            article.id=book.id;
            article.className='card-issued-book';
            let header = document.createElement('header');
            header.className='issued-book-header';
            let heading = document.createElement('h2');
            heading.className= 'issued-book-title';
            heading.innerHTML='Name : '+book.title;
            header.appendChild(heading);
            article.appendChild(header);
            let timings = document.createElement('div');
            let IssOn = document.createElement('h5')
            IssOn.className='IssOn';
            IssOn.innerHTML='Issued On:';
            timings.appendChild(IssOn);
            let IssTi = document.createElement('p');
            IssTi.innerHTML=new Date(book.issuedOn);
            timings.appendChild(IssTi);
            let Rby = document.createElement('h5')
            Rby.className='IssOn';
            Rby.innerHTML='Return By:';
            timings.appendChild(Rby);
            let Rti = document.createElement('p');
            Rti.innerHTML=new Date(book.returnBy);
            timings.appendChild(Rti);
            article.appendChild(timings);
            let fine = document.createElement('h4');
            fine.className='issue-fine';
            fine.innerHTML='Fine = Rs.'+fineAmount;
            if(fineAmount==0){
                fine.style="padding:0; margin:0; color:#00af03"
            }
            article.appendChild(fine);
            let submitForm = document.createElement('form');
            submitForm.action='/returnBook';
            submitForm.method='POST';
            let formInput = document.createElement('input');
            formInput.type='hidden';
            formInput.name='returnId';
            formInput.value=book.id;
            submitForm.appendChild(formInput);
            let formInput1 = document.createElement('input');
            formInput1.type='hidden';
            formInput1.name='fine';
            formInput1.value=hrsOd*10;
            submitForm.appendChild(formInput1);
            let returnButton = document.createElement('button');
            returnButton.className='return-button';
            returnButton.type='submit';
            returnButton.innerHTML='Return';
            submitForm.appendChild(returnButton);
            article.appendChild(submitForm)
            document.getElementById('issued-Books').appendChild(article);
        }
        else{
            let article = document.createElement('article');
            article.id=book.id;
            article.className='card-returned-book';
            let header = document.createElement('header');
            header.className='returned-book-header';
            let heading = document.createElement('h2');
            heading.className= 'returned-book-title';
            heading.innerHTML='Name : '+book.title;
            header.appendChild(heading);
            article.appendChild(header);
            let timings = document.createElement('p');
            let IssOn = document.createElement('h5')
            IssOn.className='IssOn';
            IssOn.innerHTML='Issued On:';
            timings.appendChild(IssOn);
            let IssTi = document.createElement('p');
            IssTi.innerHTML=new Date(book.issuedOn);
            timings.appendChild(IssTi);
            let Rby = document.createElement('h5')
            Rby.className='IssOn';
            Rby.innerHTML='Returnrd On:';
            timings.appendChild(Rby);
            let Rti = document.createElement('p');
            Rti.innerHTML=new Date(book.returnedOn);
            timings.appendChild(Rti);
            article.appendChild(timings);
            article.appendChild(timings);
            let fine = document.createElement('h4');
            fine.className='returned-fine';
            fine.innerHTML='Fine Paid : Rs.'+book.fine;
            if(book.fine==0){
                fine.style="padding:0; margin:0; color:#00af03"
            }
            article.appendChild(fine);
            document.getElementById('returned-books').appendChild(article);
        }
    }
}