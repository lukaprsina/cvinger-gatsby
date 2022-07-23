// https://gist.github.com/xiel/9c8e58bb5854eeec8de779f9da7f85b6
import { useState, useEffect } from 'react'
import { Theme, useTheme, Breakpoint } from '@mui/material'

export type BreakpointVisiblityValues =
    | 'xsOnly'
    | 'smOnly'
    | 'mdOnly'
    | 'lgOnly'
    | 'xlOnly'
    | 'xsUp'
    | 'smUp'
    | 'mdUp'
    | 'lgUp'
    | 'xlUp'
    | 'xsDown'
    | 'smDown'
    | 'mdDown'
    | 'lgDown'
    | 'xlDown'

export type BreakpointValueProp = BreakpointVisiblityValues | BreakpointVisiblityValues[] | 'always'

const removeCSSMQOperator = (mqString = '') => mqString.replace('@media ', '')
const getMQForVisiblityValues = (theme: Theme, visValues: BreakpointVisiblityValues[]) => {
    const { up, down, only } = theme.breakpoints
    const mqArray = visValues.map(visValue => {
        // get the correct media query creating function
        const getMqFn = visValue.endsWith('Up') ? up : visValue.endsWith('Down') ? down : only
        // parse the correct breakpoint
        const breakpoint = visValue.replace(/((Up)|(Down)|(Only))$/, '') as Breakpoint
        return removeCSSMQOperator(getMqFn(breakpoint))
    })
    return mqArray.join()
}

function useBreakpointMatch(breakpointValue: BreakpointValueProp = 'always', defaultChoice: boolean) {
    const theme = useTheme<Theme>()
    const [matches, setMatches] = useState(defaultChoice)

    useEffect(() => {
        const visibleArray =
            breakpointValue && breakpointValue !== 'always'
                ? Array.isArray(breakpointValue)
                    ? breakpointValue
                    : [breakpointValue]
                : []
        // exit early for default value
        if (breakpointValue === 'always') {
            setMatches(true)
            // no clean up needed
            return
        }

        const mediaQuery = getMQForVisiblityValues(theme, visibleArray)
        const mediaQueryList = window.matchMedia(mediaQuery)

        function matchChangeHandler(e: MediaQueryListEvent) {
            setMatches(e.matches)
        }

        // listen for media query changes
        mediaQueryList.addEventListener('change', matchChangeHandler)
        setMatches(mediaQueryList.matches)

        // cleanup and remove listeners
        return () => mediaQueryList.removeEventListener('change', matchChangeHandler)
    }, [breakpointValue, theme])

    return { matches }
}

export default useBreakpointMatch