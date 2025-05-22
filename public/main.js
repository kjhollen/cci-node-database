const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', async event => {
    const wish = document.getElementById('wish').value;
    const data = {
        wish: wish
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const response = await fetch("/wish", options);
    const json = await response.json();
    console.log(json);
    e.preventDefault();
});