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
    document.getElementById('issued-Books').addEventListener('click',e=>{
        let targetId = e.target.parentElement.children[0].value;
        let fine= e.target.parentElement.children[1].value;
        if(fine>0 && e.target.className=='return-button'){
            e.preventDefault();
            let card=e.target.parentElement.parentElement;
            card.innerHTML='';
            let heading = document.createElement('h2');
            heading.className='issued-book-title';
            heading.innerHTML='Please Pay Fine';
            card.appendChild(heading);
            let form = document.createElement('form');
            form.action='/returnBook';
            form.method='POST';
            let idfield = document.createElement('input');
            idfield.type='hidden';
            idfield.name='returnId';
            idfield.value=targetId;
            form.appendChild(idfield);
            let fineInp = document.createElement('input');
            fineInp.type='text';
            fineInp.name='fine';
            fineInp.value=fine;
            fineInp.className='pay-fine';
            fineInp.setAttribute('readonly','true')
            form.appendChild(fineInp);
            let btn = document.createElement('button');
            btn.type='submit';
            btn.className='pay';
            btn.innerHTML='PayNow';
            form.appendChild(btn);
            card.appendChild(form);
            card.style='margin-top:0.5rem'
        }

    })
})

function showIssuedBooks(books){
    let sectionHeading = document.createElement('h1');
    sectionHeading.innerHTML='Issued Books';
    document.getElementById('issued-Books').appendChild(sectionHeading);
    let hr = document.createElement('hr');
    document.getElementById('issued-Books').appendChild(hr);
    let sectionHeading2 = document.createElement('h1');
    sectionHeading2.innerHTML='Returned Books';
    document.getElementById('returned-books').appendChild(sectionHeading2);
    let hr2 = document.createElement('hr');
    document.getElementById('returned-books').appendChild(hr2);
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