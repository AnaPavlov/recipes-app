import React, { Component } from 'react'

import Header from './Header/Header'
import Categories from './Categories/Categories'
import About from './About/About'
import Contact from './Contact/Contact'

class Homepage extends Component {

    state = {
        showCategories: false
    }

    toggleCategories = () => {
        this.setState((prevState) => ({
            showCategories: !prevState.showCategories
        }))
    }
    render(props) {
        return (
            <div>
                <Header toggle={this.toggleCategories} isVisible={this.state.showCategories} />
                { this.state.showCategories ? <Categories history={this.props.history} /> : null}
                <About ref={this.props.refAbout} />
                <Contact scrollTo={this.scrollToContact} />
            </div>
        )
    }
}

export default Homepage;
