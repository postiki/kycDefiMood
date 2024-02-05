const defaultStates = {
    PERSONAL: false,
    IDENTIFY_DOC: false,
    IDENTIFY_SELFIE: false,
    INTERVIEW: false,
    SUCCESS: false
}
export const parseConfig = (configProps = defaultStates) => {
    const config = configProps
    // console.log(config)

    config['INITIAL'] = 'INITIAL'

    let transitions = Object.keys(config).reduce((acc, key, index, entries) => {
        return Object.assign(acc, {
            [key]: {
                NEXT: entries[index + 1] ? entries[index + 1] : null
            }
        })
    }, {})
    transitions.INITIAL = {};
    Object.keys(config).map((i, index) => {
        if (index === 0) {
            transitions.INITIAL['NEXT'] = i;
        }
        transitions.INITIAL[i] = i;
    })

    Object.keys(config).map(i => {
        return config[i] = i
    })

    // console.log(config)

    return {transitions, config}
}