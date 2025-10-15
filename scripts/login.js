function saveAccessToken(token) {
    localStorage.setItem('accesstoken', token);
}

document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    const token = '?access_token=' + document.getElementById('accesstoken').value;
    saveAccessToken(token);
    document.getElementById('loginmessage').textContent = 'Login successful!';
});
