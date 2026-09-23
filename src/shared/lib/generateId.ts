
export const generateId = () => {
    return window.crypto?.randomUUID ? window.crypto?.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}` 
}