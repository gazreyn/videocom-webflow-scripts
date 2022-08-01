const $downloadButtons = document.querySelectorAll('[data-download]');
const activeOS = getOS();
setActiveDownloadLinks(activeOS);

function setActiveDownloadLinks(os) {
    const productLinks = {
        presenter: {
            mac: '',
            windows: 'https://installers.videocom.com/presenter/windows',
            linux: '',
        },
        capture: {
            mac: 'https://installers.videocom.com/capture/macos',
            windows: 'https://installers.videocom.com/capture/windows',
            linux: '',
        },
    };

    const osIcons = {
        windows:
            'https://assets.website-files.com/62454b1cc04f647db929ff2f/62863b6cb17711b1edd35f31_windows-icon.svg',
        mac: 'https://assets.website-files.com/62454b1cc04f647db929ff2f/62863b6c5e0b73f4151e3f1a_apple-icon.svg',
        linux: 'https://assets.website-files.com/62454b1cc04f647db929ff2f/62863b6c7d209e26c1b93190_linux-icon.svg',
    };

    $downloadButtons.forEach((btn) => {
        if (os === 'android' || os === 'ios' || !os) {
            updateButton(
                btn,
                'Get Started',
                'https://cloud.videocom.com/auth/signup'
            );
            return;
        }

        const app = btn.getAttribute('data-download');
        const downloadLink = productLinks[app][os];
        const osIcon = osIcons[os];

        if (!downloadLink) {
            updateButton(btn, 'Not Available Yet', '', osIcon);
            return;
        }

        updateButton(
            btn,
            `Download ${capitalizeFirstLetter(app)}`,
            downloadLink,
            osIcon
        );
    });
}

function updateButton(
    buttonElement,
    text = '',
    downloadLink = '',
    iconLink = ''
) {
    const $buttonText = buttonElement.getElementsByClassName('button-text')[0];
    const $osIcon = buttonElement.getElementsByClassName('button-os-icon')[0];

    if (!iconLink) {
        $osIcon.style.display = 'none';
    } else {
        $osIcon.style.display = 'inline-block';
    }

    buttonElement.href = downloadLink;
    $buttonText.innerText = text;
    $osIcon.src = iconLink;
}

function getOS() {
    const match = window.navigator.platform.match(
        /(Win|Mac|Linux|iPad|iPhone|iPod|Android)/
    );
    const os = (match && match[1]) ?? '';

    if (os === 'Win') {
        return 'windows';
    } else if (os === 'Mac') {
        return 'mac';
    } else if (/Android/.test(window.navigator.userAgent)) {
        // Android must come before linux otherwise android is detected as linux
        return 'android';
    } else if (os === 'Linux') {
        return 'linux';
    } else if (['iPad', 'iPhone', 'iPod'].indexOf(os) !== -1) {
        return 'ios';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
