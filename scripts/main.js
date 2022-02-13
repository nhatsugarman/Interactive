

const getClass = (element) => document.querySelector(`.${element}`)
const getAllClass = (element) => document.querySelectorAll(`.${element}`)

const main = document.querySelector('.main');

// Comment data view

const getData = (data) => {
    data.comments.map(item => {
        console.log(item.replies);
        const sectionInteractive = document.createElement("section");


        sectionInteractive.setAttribute("class", "interactive");

        sectionInteractive.innerHTML = `
                <div class="container">
                    
                    <div class="interactive-container">
                        <div class="interactive-left">
                            <a href="#" class="interactive-plus">
                                <img src="./images/icon-plus.svg" alt="">
                        
                            </a>
                            <h2>${item.score}</h2>
                            <a href="#" class="interactive-minus">
                                <img src="./images/icon-minus.svg" alt="">
                            </a>
                        </div>
                        <div class="interactive-right">
                            <div class="interactive-top">
                                <div class="interactive-info">
                                    <a href="#" class="interactive-icon">
                                        <img src=${item.user.image.png} alt="">
                                    </a>
                                    <a href="#" class="interactive-name">
                                        ${item.user.username}
                                    </a>
                                    <p> ${item.createdAt}</p>
                                </div>
                                <a href="#" class="interactive-reply action">
                                    <img src="./images/icon-reply.svg" alt="">
                                    <span>Reply</span>
                                </a>
                            </div>
                            <p class="interactive-text">
                                ${item.content}
                            </p>
                        </div>
                        <div class="mobile">
                            <div class="mobile-left">
                                <a href="#" class="mobile-plus">
                                    <img src="./images/icon-plus.svg" alt="">
                                </a>
                                <h2>${item.score}</h2>
                                <a href="#" class="mobile-minus">
                                    <img src="./images/icon-minus.svg" alt="">
                                </a>
                            </div>
                            <a href="#" class="mobile-reply action">
                                <img src="./images/icon-reply.svg" alt="">
                                <span>Reply</span>
                            </a>
                        </div>
                    </div>
                    
                </div>
               `
        main.appendChild(sectionInteractive)

        item.replies.map(reply => {
            const sectionReplies = document.createElement("section");


            sectionReplies.setAttribute("class", "interactive");

            sectionReplies.innerHTML = `<div class="container">
                    <div class="interactive-container reply">
                        <div class="interactive-left">
                            <a href="#" class="interactive-plus">
                                <img src="./images/icon-plus.svg" alt="">
                            </a>
                            <h2>5</h2>
                            <a href="#" class="interactive-minus">
                                <img src="./images/icon-minus.svg" alt="">
                            </a>
                        </div>
                        <div class="interactive-right">
                            <div class="interactive-top">
                                <div class="interactive-info">
                                    <a href="#" class="interactive-icon">
                                        <img src="./images/avatars/image-juliusomo.png" alt="">
                                    </a>
                                    <a href="#" class="interactive-name">
                                        juliusomo
                                    </a>
                                    <div class="interactive-self">
                                        <p>you</p>
                                    </div>
                                    <p>2 days ago</p>
                                </div>
                                <div class="interactive-action">
                                    <a href="#" class="interactive-delete action hide-on-mobile">
                                        <img src="./images/icon-delete.svg" alt="">
                                        <span>Delete</span>
                                    </a>
                                    <a href="#" class="interactive-edit action">
                                        <img src="./images/icon-edit.svg" alt="">
                                        <span>Edit</span>
                                    </a>
                                </div>
                            </div>
                            <p class="interactive-text">
                                I couldn't agree more with this. Everything moves so fast and it always seems like
                                everyone knows the newest library/framework. But the fundamentals are what stay
                                constant.",
                            </p>
                        </div>
                        <div class="mobile">
                            <div class="mobile-left">
                                <a href="#" class="mobile-plus">
                                    <img src="./images/icon-plus.svg" alt="">
                                </a>
                                <h2>12</h2>
                                <a href="#" class="mobile-minus">
                                    <img src="./images/icon-minus.svg" alt="">
                                </a>
                            </div>
                            <div class="interactive-action">
                                <a href="#" class="interactive-delete mobiles action">
                                    <img src="./images/icon-delete.svg" alt="">
                                    <span>Delete</span>
                                </a>
                                <a href="#" class="mobile-reply action">
                                    <img src="./images/icon-edit.svg" alt="">
                                    <span>Edit</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`
            main.appendChild(sectionReplies)
        })

    }
    )

    // Add comment in the screen 

    const section = document.createElement("section");

    section.setAttribute("class", "comment");
    section.innerHTML = `<div class="container">

                    <form class="hide-on-mobile comment-container">
                        <a href="#" class="comment-img">
                            <img src="./images/avatars/image-juliusomo.png" alt="">
                        </a>
                        <input type="text" placeholder="Add a comment..." class="comment-add">
                        <input type="submit" value="Send" class="comment-submit">
                    </form>
                    <form class="comment-container mobile">
                        <input type="text" placeholder="Add a comment..." class="comment-add">
                        <div class="comment-bottom-mobile">
                            <a href="#" class="comment-img">
                                <img src="./images/avatars/image-juliusomo.png" alt="">
                            </a>
                            <input type="submit" value="Send" class="comment-submit">
                        </div>
                    </form>


                </div>`
    main.appendChild(section)

};


// const deleteBtn = document.querySelector('.interactive-delete');
// console.log(deleteBtn);
// const mobileDeleteBtn = document.querySelector('.interactive-delete.mobiles');

const mobileDeleteBtn = getClass('interactive-delete.mobiles');


console.log('hi');
console.log(mobileDeleteBtn);


const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCancel = document.querySelector(".modal-cancel");
// const modalCancel = getClass(".modal-cancel");

const modalDelete = document.querySelector(".modal-delete");


const interactiveReply = document.querySelectorAll('.interactive-reply')
const interactiveSection = document.querySelectorAll('.interactive')



// deleteBtn.addEventListener("click", handleToggleModal);
modalCancel.addEventListener("click", handleToggleModal);
mobileDeleteBtn.addEventListener("click", handleToggleModal);

function handleToggleModal(e) {
    // modal.classList.toggle("open");
    console.log(1);
}

// When click outside
window.addEventListener("click", function (e) {
    if (!modalContent.contains(e.target) && !deleteBtn.contains(e.target) && !mobileDeleteBtn.contains(e.target)) {
        modal.classList.remove("open");
    }
});

// Interactive reply 
interactiveReply.forEach((item, index) => {

    item.onclick = function (e) {

        const div = document.createElement("div");
        div.innerHTML = `<section class="comment">
        <div class="container">

            <form class="hide-on-mobile comment-container">
                <a href="#" class="comment-img">
                    <img src="./images/avatars/image-juliusomo.png" alt="">
                </a>
                <input type="text" placeholder="Add a comment..." class="comment-add">
                <input type="submit" value="Send" class="comment-submit">
            </form>
            <form class="comment-container mobile">
                <input type="text" placeholder="Add a comment..." class="comment-add">
                <div class="comment-bottom-mobile">
                    <a href="#" class="comment-img">
                        <img src="./images/avatars/image-juliusomo.png" alt="">
                    </a>
                    <input type="submit" value="Send" class="comment-submit">
                </div>
            </form>


        </div>
    </section>`
        interactiveSection[index].appendChild(div);
    }

})


// Delete the comment in modal container
modalDelete.addEventListener('click', handleDeleteComment)

function handleDeleteComment() {

}
const clck = document.querySelector('.interactive-edit')
console.log(clck);

fetch("../data.json", {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})
    .then((response) => response.json())
    .then(data => getData(data))