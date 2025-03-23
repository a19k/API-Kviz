async function getData(url) {
    let isFetching = false;
    try {
        if(isFetching)return;

        isFetching = true;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        isFetching = false;
    
        const json = await response.json();
        localStorage.setItem("quiz",JSON.stringify(json));
    }
    catch (error) {
        localStorage.setItem("quiz",JSON.stringify(-1));
    }
    finally{
        isFetching = false;
    }
}

export default getData;