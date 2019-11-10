import React, { Component } from 'react'

import styles from './Categories.module.css'
import MealCard from '../../MealCard/MealCard'
import axios from 'axios'

class Categories extends Component {

    state = {
        categories: null
    }

    componentDidMount () {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => this.setState({
            categories: res.data.categories
        }))
    }

    handleCategory = (name) => {
        this.props.history.push("/category/" + name)
    }

    render() {

        let categories = null;
        if (this.state.categories) {
            categories = this.state.categories.map(category => {
                return <MealCard onClick={() => this.handleCategory(category.strCategory)} key={category.idCategory} name={category.strCategory} img={category.strCategoryThumb} />
            })
        }
        return (
            <div className={styles.categories}>
                {/* <h1>Choose category:</h1> */}
            <div className={styles.wrap}>
                { categories }
            </div>
            </div>
        )
    }
}

export default Categories