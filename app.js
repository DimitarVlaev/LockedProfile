async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.getElementById('main');
    main.innerHTML = '';

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(createProfileCard);

    document.querySelectorAll('button').forEach(e => e.addEventListener('click', (ev) => {
        if (ev.target.parentNode.querySelector("input[value='unlock']").checked) {
            if (ev.target.textContent == 'Show more') {
                ev.target.parentNode.querySelector('#user1HiddenFields').style.display = 'block';
                ev.target.textContent = 'Hide it';
            } else if (ev.target.textContent == 'Hide it') {
                ev.target.parentNode.querySelector('#user1HiddenFields').style.display = '';
                ev.target.textContent = 'Show more';
            }
        }
    }));
}

function createProfileCard(entry) {
    const profile = e('div', { className: 'profile' },
        e('img', { src: './iconProfile2.png', className: 'userIcon' }),
        e('label', {}, 'Lock'),
        e('input', { type: 'radio', name: 'user1Locked', value: 'lock', checked: true }),
        e('label', {}, 'Unlock'),
        e('input', { type: 'radio', name: 'user1Locked', value: 'unlock' }),
        e('br', {}),
        e('hr', {}),
        e('label', {}, 'Username'),
        e('input', { type: 'text', name: 'user1Username', value: entry.username, disabled: true, readonly: true }),
        e('div', { id: 'user1HiddenFields' },
            e('hr', {}),
            e('label', {}, 'Email:'),
            e('input', { type: 'email', name: 'user1Email', value: entry.email, disabled: true, readonly: true }),
            e('label', {}, 'Age:'),
            e('input', { type: 'age', name: 'user1Age', value: entry.age, disabled: true, readonly: true })
        ),
        e('button', {}, 'Show more'));
    main.appendChild(profile);
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}