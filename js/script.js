const Main = {
    init: function () {
        this.cacheSelectors();
        this.bindEvents();

    },

    cacheSelectors: function () {
        this.buttons = document.querySelectorAll('.story-btn')

        this.navbarLinks = document.querySelectorAll('.navbar-link')
        this.scrollToBtn = document.querySelector('.scrollTop')
    },

    bindEvents: function () {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('change')
                button.nextElementSibling.classList.toggle('show')
            })
        })

        this.scrollToBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            this.scrollToBtn.style.opacity = '0'
            this.scrollToBtn.style.cursor = 'default'
        })

        window.addEventListener('scroll', () => {
            const y = document.querySelector(`.section-2`)
            if (window.scrollY > y.offsetTop) {
                this.scrollToBtn.style.opacity = '1'
                this.scrollToBtn.style.cursor = 'pointer'
            } else {
                this.scrollToBtn.style.opacity = '0'
                this.scrollToBtn.style.cursor = 'default'
            }
        })

        this.navbarLinks.forEach((links, idx) => {
            links.innerHTML = links.innerText.split('').map((letter, idx) => `<span style="animation-delay:${idx * 60}ms;">${letter}</span>`).join(``)
            links.addEventListener('click', () => {
                this.Events.goTo(idx)
                this.scrollToBtn.style.opacity = '1'
                this.scrollToBtn.style.cursor = 'pointer'
            })
        })

    },

    Events: {
        goTo: function (x) {
            const y = document.querySelector(`.section-${x + 1}`)
            window.scrollTo({
                top: y.offsetTop,
                behavior: "smooth",
            });
        }
    },

}

Main.init();

const Form = {
    init: function () {
        this.cacheSelectors();
        this.bindEvents();
    },

    cacheSelectors: function () {
        this.form = document.forms[0]
        this.inputName = document.forms[0]['name']
        this.inputEmail = document.forms[0]['email']
        this.textArea = document.forms[0]['textarea']
    },

    bindEvents: function () {
        this.form.addEventListener('submit', this.Events.submitForm.bind(this))

        this.inputName.addEventListener('focus', () => this.inputName.parentElement.classList.add('rotate'))
        this.inputName.addEventListener('blur', () => this.inputName.parentElement.classList.remove('rotate'))

        this.inputEmail.addEventListener('focus', () => this.inputName.parentElement.classList.add('rotate'))
        this.inputEmail.addEventListener('blur', () => this.inputName.parentElement.classList.remove('rotate'))

        this.textArea.addEventListener('focus', () => this.inputName.parentElement.classList.add('rotate'))
        this.textArea.addEventListener('blur', () => this.inputName.parentElement.classList.remove('rotate'))
    },

    Events: {
        submitForm: function(e){
            e.preventDefault()
            let error = false
            this.form.classList.add('rotate')
            const name = document.forms[0]['name']
            const email = document.forms[0]['email']
            const textarea = document.forms[0]['textarea']

            if (!name.value || !isNaN(name.value)) {
                error = true
                name.placeholder = 'Please enter your name'
                name.classList.add('formError')

                setTimeout(() => {
                    name.placeholder = 'Your name...'
                }, 3000)
            } else {
                name.classList.remove('formError')
            }

            if (!email.value) {
                error = true
                email.placeholder = 'Please enter your email'
                email.classList.add('formError')

                setTimeout(() => {
                    email.placeholder = 'Your email...'
                }, 3000)
            } else {
                email.classList.remove('formError')
            }

            if (!textarea.value) {
                error = true
                textarea.placeholder = 'Please leave us a message'
                textarea.classList.add('formError')

                setTimeout(() => {
                    textarea.placeholder = 'Your message...'
                }, 3000)
            } else {
                textarea.classList.remove('formError')
            }

            if (!error) {
                this.form.classList.add('submited')
                setTimeout(() => {
                    this.form.innerHTML = `<p>Dear ${name.value}, Thank you for reaching out! You are an invaluable part of everything we do here. And we’re absolutely thrilled to hear from you.</p>`
                    this.form.classList.remove('submited')
                }, 1000)
            }
        }
            
        }
}

Form.init();