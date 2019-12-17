function notLoggedIn() {
    document.getElementById( 'not-logged-in' ).setAttribute( 'style', 'display:flex' );

    document.getElementById('login-button').addEventListener('click', () => {
        window.open("https://www.coursera.org/?authMode=login", '_blank');
        window.close();
    })
}

function loggedIn( cookie ) {
    document.getElementById( 'logged-in' ).setAttribute( 'style', 'display:flex' );

    const button = document.getElementById( 'copy-button' );

    button.addEventListener( 'click', e => {
        navigator.clipboard.writeText( cookie.value ).then(
            () => copySuccess(button),
            () => copyFailure(button)
        )
    } )
}

function copySuccess(button) {
    const countdown = (sec) => button.innerText = 'Copied the code! Closing in ' + sec + '...';
    const limit = 4;
    for ( let sec = limit; sec > 0; sec-- ) {
        window.setTimeout(() => countdown(sec), (limit - sec) * 1000)
    }
    window.setTimeout( () => window.close(), limit * 1000)
}

function copyFailure(button) {
    button.classList.add( 'button-error' );
    button.innerText = 'Error! Could not copy the code.';
}

function init(cookies) {
    cookies
        .get( { url: "https://www.coursera.org", name: 'CAUTH' }, (cookie) => {
            if ( !cookie ) {
                notLoggedIn();
            } else {
                loggedIn( cookie );
            }
        })
}

init( (function () {
    return window.msBrowser ||
           window.browser ||
           window.chrome;
})().cookies );