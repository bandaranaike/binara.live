module.exports = {
    apps: [
        {
            name: 'binara.live',
            script: 'npx',
            args: 'next start',
            env: {
                NODE_ENV: 'production',
                PORT: 3004,
            },
        },
    ],
};