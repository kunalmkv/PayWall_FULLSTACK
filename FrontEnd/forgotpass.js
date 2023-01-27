document.getElementById('forgot_mail').onclick = async function (e) {
    const forgotten_mail = await axios.post('http://localhost:3000/password/forgotpassword', { headers: { "Authorization": token } });
    console.log(response);
}