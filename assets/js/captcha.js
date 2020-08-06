document.getElementById('captcha-form').addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    let token= await grecaptcha.execute('<SITE KEY>', { action: 'homepage' });
    
    const captcha = token;

    let response=await fetch('/users/captcha', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ captcha: captcha })
    });

    let data= await response.json();

    if(data.success){
        document.getElementById('captcha-form').submit();
    }
    else{
        alert('captcha failed');
    }
}
