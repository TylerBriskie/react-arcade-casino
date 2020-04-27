import React, { Component, createContext } from 'react';


export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    state = {
        theme: 'neonbeach',
        default: {
            base: '#ABC0B5',
            accent: '#947EB0',
            primary: '#000000',
            secondary: '#766C7F',
            tertiary: '#808D8E',

        },
        icecream: {
            base: '#F7F9F9',
            accent: '#BED8D4',
            primary: '#2081C3',
            secondary: '#63D2FF',
            tertiary: '#78D5D7',

        },
        neonbeach: {
            base: '#000000',
            accent: '#F39EBE',
            primary: '#009FB7',
            secondary: '#FED766',
            tertiary: '#E12362',
        }

    }

    setTheme = (theme) => {
        this.setState({theme})
    }

    render() {
        return (
            <ThemeContext.Provider value={{...this.state, setTheme: this.setTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}


export default ThemeContextProvider;