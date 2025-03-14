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
        console.log(json);
    }
    catch (error) {
        console.error(error.message);
    }
    finally{
        isFetching = false;
    }
}

export default getData;