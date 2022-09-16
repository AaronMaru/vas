const setJson = (key: string, val: any) => {

    try {
        // localStorage.setItem(key, JSON.stringify(val));
        sessionStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        // localStorage.setItem(key, val);
        sessionStorage.setItem(key, val);
    }
};

const getJson = (key: string) => {

    let data: string = "{}";
    try {

        if (sessionStorage.getItem(key) !== null) {
            // data = localStorage.getItem(key);
            data = sessionStorage.getItem(key);
        }

        return JSON.parse(data);
    } catch (e) {
        data = sessionStorage.getItem(key);
    }
};


export {
    setJson,
    getJson
}