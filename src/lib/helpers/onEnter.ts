export function onEnter(cb: () => void) {
    return (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            cb()
        }
    }
}
