import { createTheme } from '@mui/material'

const themeAttributes = {
    pallete : {
        primary: '#C11010',
        primaryHover: '#C11010'
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: themeAttributes.pallete.primary,
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'white'
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
                fullWidth: true,
                margin: 'dense'
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: '50px',
                            border: 'solid #ccc 1px',
                            color: 'black'
                        },
                    },
                    "& .Mui-error": {
                        color: 'red'
                    },
                    "::placeholder": {
                        color: '#ccc'
                    },
                    ":active": {
                        color: 'black'
                    },
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
                fullWidth: true,
                margin: 'dense'
            },
            styleOverrides: {
                outlined: {
                    
                }
            }
        },
        MuiTypography: {
            variants: [
                {
                    props: {variant: 'h1'},
                    style: {
                        fontSize: '2rem',
                        color: themeAttributes.pallete.primary
                    }
                }
            ],
            styleOverrides: {
                root: {
                    fontFamily: 'Outfit-regular, Sans-serif',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px',
                },
            },
            variants: [
                {
                    props: {variant: 'primary-button'},
                    style: {
                        backgroundColor: themeAttributes.pallete.primary,
                        "& svg":{
                            color: 'black',
                        },
                        ":hover": {
                            backgroundColor: themeAttributes.pallete.primary,
                            color: 'white',
                            "& svg":{
                                color: 'white',
                            }
                        }
                        
                    },
                },
                {
                    props: {variant: 'secondary-button'},
                    style: {
                        backgroundColor: themeAttributes.pallete.primaryHover,
                        "& svg":{
                            color: 'white',
                        },
                        ":hover": {
                            backgroundColor: themeAttributes.pallete.primary,
                            color: 'white',
                        }
                        
                    },
                }
            ],
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.active': {
                        backgroundColor: themeAttributes.pallete.primary,
                        color: 'white'
                    }
                },
            },
            variants: [
                {
                    props: {
                        variant: 'outlined',
                    },
                    style: {
                        borderColor: themeAttributes.pallete.primary,
                        color: 'white',
                    }
                },
                {
                    props: {
                        variant: 'selected',
                    },
                    style: {
                        backgroundColor: themeAttributes.pallete.primary,
                        color: 'white',
                        '&:hover' : {
                            backgroundColor: '#800'
                        }
                    }
                }
            ]
        }
    },
})

export default theme