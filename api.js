async function getData(){
    const res = await fetch('https://dummyjson.com/test');
    const data = await res.json();
    console.log(data);
}



