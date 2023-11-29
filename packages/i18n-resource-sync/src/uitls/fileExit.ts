const fs = require('fs');
function fileExist(filePath) {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

export default fileExist;
