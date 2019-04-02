const extractFileNo = function(page) {
    let start = 51;
    let fileno = '';
    for (let i=start; i<start+6; i++) {
        fileno += page.Texts[i].R[0].T;
    }
    return { fileno:fileno };
}

module.exports = { extractFileNo:extractFileNo }
