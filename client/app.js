const loginForm = document.querySelector('#welcome-form')
const messagesSection = document.querySelector('#messages-section')
const messageList = document.querySelector('#messages-list')
const addMessageForm = document.querySelector('.add-messages-form')
const userNameInput = document.querySelector('#welcome-form .text-input')
const messageContentInput = document.querySelector('#add-messages-form .text-input')
let userName
console.log(addMessageForm)

const login = (e) => {
    e.preventDefault()
    if (userNameInput.value.length > 0) {
        userName = userNameInput.value
        console.log(userName)
        loginForm.classList.remove('show')
        messagesSection.classList.add('show')
    } else {
        alert('You can not leave this field empty')
    }
}

loginForm.addEventListener('submit', (e) => {
    login(e);
 });

const addMessage = (author, content) => {
    const element = document.createElement('li')
    element.classList.add('message', 'message--received')
    if(author === userName) {
        element.classList.add('message--self')
    }
    const header = document.createElement('h3')
    header.classList.add('message__author')
    header.innerHTML = author === userName ? 'You' : author
    const message = document.createElement('div')
    message.classList.add('message__content')
    message.innerHTML = content
    element.appendChild(header)
    element.appendChild(message)
    messageList.appendChild(element)    
}

const sendMessage = (e) => {
    e.preventDefault()
    if(messageContentInput.value === '') {
        alert('Please fill in msg input before sending')
    } else {
        addMessage(userName, messageContentInput.value)
        messageContentInput.value = ''
    }
}

addMessageForm.addEventListener('submit', (e) => {
    sendMessage(e, userName, messageContentInput.value);
})


