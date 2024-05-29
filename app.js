document.addEventListener("DOMContentLoaded", function() {
    const connectButton = document.getElementById('connect-wallet');
    const bumpButton = document.getElementById('bump-btn');
    const notifications = document.getElementById('notifications');
    let walletAddress;

    async function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            try {
                const resp = await window.solana.connect();
                walletAddress = resp.publicKey.toString();
                connectButton.textContent = walletAddress.slice(0, 5) + '...' + walletAddress.slice(-4);
                connectButton.disabled = true;
            } catch (err) {
                console.error('Wallet connection failed:', err);
            }
        } else {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                // Open Phantom app using deep link
                window.location.href = 'phantom://open?action=connect&network=mainnet-beta&redirect=' + encodeURIComponent(window.location.href);
            } else {
                alert('Phantom Wallet not found. Please install it from https://phantom.app/');
            }
        }
    }

    async function bumpProject() {
        const projectAddress = document.getElementById('project-address').value;
        const bumpDuration = document.getElementById('bump-duration').value;

        if (!walletAddress) {
            alert('Please connect your wallet first.');
            return;
        }

        if (projectAddress === '') {
            alert('Please enter a project address.');
            return;
        }

        // Simulate bumping process
        notifications.innerHTML = `Bumping project ${projectAddress} for ${bumpDuration} SOL...`;

        setTimeout(() => {
            notifications.innerHTML = `Bump successful for project ${projectAddress}!`;
        }, 2000);
    }

    connectButton.addEventListener('click', connectWallet);
    bumpButton.addEventListener('click', bumpProject);
});
