import React, { Component } from 'react'

import styles from './Contact.module.css'

class Contact extends Component {
    render() {
        return (
            <div className={styles.contact} id="contact">
               <div className={styles.wrap}>
                   <h1>Contact</h1>
                   <form>
                       <input type="text" placeholder="First name" />
                       <input type="text" placeholder="Last name" />
                       <input type="email" placeholder="E-mail" />
                       <textarea placeholder="Message"></textarea>
                       <button>Send</button>
                   </form>
                   </div> 
            </div>
        )
    }
}

export default Contact
