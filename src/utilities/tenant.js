export const getTenant = () => {
    return localStorage.getItem("tenant")
}

export const setTenant = (tenant) => {
    return localStorage.setItem("tenant", tenant)
}

export const removeTenant = () => {
    return localStorage.removeItem("tenant")
}