const getClass = (element) => document.querySelector(`.${element}`)
const getAllClass = (element) => document.querySelectorAll(`.${element}`)


// HTML template

const commentTemplate = (currentUserAvatar, id, content, createdAt, like, avatar, username) => {
    // console.log(avatar)
    return `
    <section class="interactive" data-container=${id}>
        <div class="container">
            <div class="comment">
                <div class="comment-container">
                    <div class="likes-wrapper">

                        <div class="interactive-left">
                            <a class="interactive-plus plus" data-like=${id}>
                                <img src="./images/icon-plus.svg" alt="">
                            </a>
                            <h2 data-like=${id} class="likes-count">${like}</h2>
                            <a class="interactive-minus minus" data-like=${id}>
                                <img src="./images/icon-minus.svg" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="interactive-right">
                        <div class="interactive-top">
                            <div class="interactive-info">
                                <a href="#" class="interactive-icon">
                                    <img src=${avatar} alt="">
                                </a>
                                <a href="#" class="interactive-name">
                                    ${username}
                                </a>
                                <p><span class="current-user hide" data-user=${id}>you</span></p>
                                <p>${createdAt}</p>
                            </div>
                            <div class="edit-delete edit${id} center">
                                <div class="delete-btn center gap" data-delete=${id}>
                                    <img src="images/icon-delete.svg" alt="delete">
                                    <span>delete</span>
                                </div>
                                <div class="edit-btn center gap" data-edit=${id}>
                                    <img src="images/icon-edit.svg" alt="edit">
                                    <p><span>edit</span></p>
                                </div>
                            </div>
                            <a class="interactive-reply action reply${id}" data-comment=${id}>
                                <img src="./images/icon-reply.svg" alt="">
                                <span>Reply</span>
                            </a>
                        </div>
                      
                        <div class="content-wrapper"  data-content=${id}>
                            <p class="interactive-text" data-content=${id}>
                                ${content}
                            </p>
                            <textarea class="text-area hide">${content}</textarea>
                            <div class="submit update hide show">
                                <a class="btn update-btn">update</a>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>

            <div class="comment-input hide" data-comment=${id}>
                <div class="avatar-icon">
                    <img class="avatar" src=${currentUserAvatar} alt="avatar">
                </div>
                <div class="input-box">
                    <textarea class="reply-input" name="input" placeholder="Add comment..."></textarea>
                </div>
                <div class="submit-btn reply-btn${id}">
                    <a class="btn">reply</a>
                </div>
            </div>
            
        </div>
        <div class="comment-replies comment-replies${id}">
      
    </section>
    `
}

const displayContent = (content) => {

    const comments = getClass("comment-wrapper")
    console.log(comments);
    const commentWrapper = getClass("main")
    

    // get last index of id which will enable us to increase id for the next comment created

    let incrId = ""

    content.comments.forEach((com) => {
        for (last in com) {

            let temp = com.replies
            temp.forEach((tem) => {
                incrId = parseInt(tem.id)
            })
        }
    })

    // comment input field avatar

    const commentInputAvatar = getClass("input-avatar");

    commentInputAvatar.src = content.currentUser.image.png

    // displaying comments and there corresponding replies 
    const commentsFromObj = content.comments;

    commentsFromObj.forEach((comment) => {
        comments.innerHTML += commentTemplate(content.currentUser.image.png, comment.id, comment.content, comment.createdAt, comment.score, comment.user.image.png, comment.user.username);

        if (comment.replies.length > 0) {
            let commentReplies = getClass(`comment-replies${comment.id}`);
            let replies = comment.replies
   
            replies.forEach((reply) => {
                commentReplies.innerHTML += commentTemplate(content.currentUser.image.png, reply.id, reply.content, reply.createdAt, reply.score, reply.user.image.png, reply.user.username);

                // remove the reply button if its on replied comment
                removeReplyBtnForUser(content.currentUser.username, reply.user.username, reply.id)
            })
        }

        removeReplyBtnForUser(content.currentUser.username, comment.user.username, comment.id)
    })


    likes(getAllClass("interactive-left"), getAllClass("likes-count"))
   
    showReplyInput(content, getAllClass("interactive-reply"), getAllClass("comment-input"), getAllClass("interactive"), incrId)

    editComment(getAllClass("edit-btn"), getAllClass("content-wrapper"))


    deleteComment(commentWrapper, getAllClass("interactive"), getAllClass("delete-btn"))


    addComment(content, comments, getClass("comment-submit"), getClass("comment-add"), incrId)
 
}


// like button

const likes = (likes, showLikes) => {
    likes.forEach((like) => {

        // console.log(like);
        // console.log(showLikes);

        like.addEventListener("click", (e) => {
            if (e.target.classList.contains("plus") || e.target.parentNode.classList.contains("plus")) {
                likeBtnNav(e.target, e.target.parentNode, "plus")
      
            } else if (e.target.classList.contains("minus") || e.target.parentNode.classList.contains("minus")) {
                likeBtnNav(e.target, e.target.parentNode, "minus")
      
            }
        })
    })

    const likeBtnNav = (child, parent, value) => {

        showLikes.forEach((showLike) => {

            if (showLike.dataset.like == child.dataset.like || showLike.dataset.like == parent.dataset.like) {
                let likeNav = Number(showLike.textContent)
                if (value == "minus") {
                    showLike.textContent = likeNav ? --likeNav : 0
                } else if (value == "plus") {
                    showLike.textContent = ++likeNav
                }
            }
        })
    }
}

// if its the current user remove the reply button and add edit and delete button

const removeReplyBtnForUser = (currentUserName, commentUserName, id) => {
    if (currentUserName === commentUserName) {
        const editDelete = getAllClass(`edit-delete`)
        const replyLink = getAllClass(`reply`)
        const currentUserId = getAllClass("current-user")

        // indicate that its the current user

        currentUserId.forEach((user) => {
            if (user.dataset.user == id) {
                user.classList.remove("hide")
            }
        })

        editDelete.forEach((edit) => {
            if (edit.classList.contains(`edit${id}`)) {
                edit.classList.remove("hide")
            }
        })

        replyLink.forEach((reply) => {
            if (reply.classList.contains(`reply${id}`)) {
                reply.classList.add("hide")
            }
        })
    }
}

// show reply input field onclick

const showReplyInput = (content, replyLinks, replyInputs, commentContainer, incrId) => {

    replyLinks.forEach((replyLink) => {

        replyLink.addEventListener("click", () => {
 
            replyInputs.forEach((replyInput) => {


                if (replyLink.dataset.comment == replyInput.dataset.comment) {

                    replyInput.classList.toggle("show")
              

                    const replyInputField = replyInput.childNodes[3].childNodes[1]

                    const replyBtn = replyInput.childNodes[5].childNodes[1]  
           


                    replyBtn.addEventListener("click", () => {
                        let text = replyInputField.value
                        console.log(text);
                       

                        replyInputField.focus()

                        if (text) {
    
                            commentContainer.forEach((commentCon) => {
                                console.log(replyInput.dataset.comment);
                                console.log(commentCon.dataset.container);

                                if (replyInput.dataset.comment == commentCon.dataset.container) {
                                    const commentReplies = getClass(commentCon.childNodes[1].classList[0])
                                    incrId = incrId + 1
                                    commentReplies.innerHTML += commentTemplate(content.currentUser.image.png, incrId, text, "just now", 0, content.currentUser.image.png, content.currentUser.username);
                                    replyInputField.value = ""
                                    replyInput.classList.remove("show")                      
                                }
                            })
                        }
                    })
                }
            })
        })
    })
}

// editing current user comments

const editComment = (editBtns, commentContent) => {
    editBtns.forEach((editBtn) => {
        console.log(editBtns);
        editBtn.addEventListener("click", (e) => {

            console.log('succes');
            console.log(commentContent);
            commentContent.forEach((commentText) => {

                if (editBtn.dataset.edit == commentText.dataset.content) {


                    const comment_text = commentText.childNodes[1]

                    const textArea = commentText.childNodes[3]
                    const updateBtn = commentText.childNodes[5]

                    comment_text.classList.add("hide")
                    textArea.classList.add("show")
                    updateBtn.classList.add("show")

                    updateBtn.addEventListener("click", () => {

                        comment_text.textContent = textArea.value

                        comment_text.classList.remove("hide")
                        textArea.classList.remove("show")
                        updateBtn.classList.remove("show")
                    })
                }
            })
        })
    })
}

// delete current user comments

const deleteComment = (wrapper, commentContainer, deleteBtns) => {

    console.log(commentContainer);

    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
            commentContainer.forEach((comment) => {


                if (deleteBtn.dataset.delete == comment.dataset.container) {

                    const deleteWrapper = getClass("modal")
                    deleteWrapper.classList.add("open")
                    console.log(deleteWrapper);
                    deleteWrapper.addEventListener("click", (e) => {

                        
                        if (e.target.classList.contains("cancel")) {
                            console.log('da den day');
                            deleteWrapper.classList.remove("open")
                        }

                        if (e.target.classList.contains("delete")) {
                            deleteWrapper.classList.remove("open")
                            comment.innerHTML = ""
                        }
                    })
               
                }
            })
        })
    })
}

// add comment by the user

const addComment = (content, comments, commentBtn, commentInput, incrId) => {

    commentBtn.addEventListener("click", () => {
        incrId = incrId + 1

        let text = commentInput.value
        console.log(text);
        comments.innerHTML += commentTemplate(content.currentUser.image.png, incrId, text, "just now", 0, content.currentUser.image.png, content.currentUser.username);
        commentInput.value = ""

        const mainObj = {
            id: incrId,
            content: text,
            createdAt: "just now",
            score: 0,
            replyingTo: "maxblagun",
            user: {
                image: {
                    png: "./images/avatars/image-ramsesmiron.png",
                    webp: "./images/avatars/image-ramsesmiron.webp"
                },
                username: "ramsesmiron"
            },
            replies: []
        }
        let commentArr = content.comments
        commentArr.push(mainObj)
        console.log(mainObj)

    })
}

fetch("../data.json")
    .then(response => response.json())
    .then(obj => displayContent(obj))
    .catch(error => console.log(error))
