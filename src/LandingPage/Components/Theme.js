import { extendTheme } from '@chakra-ui/react'

const fonts =
{
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
}

const breakpoints = {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
}

const Theme = extendTheme({
    breakpoints,
    fonts
})

export default Theme