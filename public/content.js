if (!window.myWallet) {
    window.myWallet = {
        connect: async () => {
            return chrome.runtime.sendMessage({ type: 'CONNECT' });
        },
        signTransaction: async (transaction) => {
            return chrome.runtime.sendMessage({
                type: 'SIGN_TRANSACTION',
                transaction
            });
        },
        setNetwork: (network) => {
            chrome.runtime.sendMessage({
                type: 'SET_NETWORK',
                network
            });
        }
    };

    console.log('Wallet API injected successfully');
}