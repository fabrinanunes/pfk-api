const fs = require('fs');
const path = require('path');

module.exports = server => {
    const files = fs.readdirSync(__dirname)
    const filesFilter = files.filter(file => ((file.indexOf('.')) !== 0 && (file !== 'routes.js')))
    filesFilter.forEach(file => {
        const filePath = path.resolve(__dirname, file)
        require(filePath)(server)
    })
}