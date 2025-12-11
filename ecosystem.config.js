module.exports = {
    apps: [
        {
            name: "binara.live",
            cwd: "/var/www/binara.live",
            script: "node_modules/.bin/next",
            args: "start -p 3000",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
