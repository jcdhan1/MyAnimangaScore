var moExpress = require('express');
var oRouter = moExpress.Router();
const moJikan = require('jikan-node');
const oMAL = new moJikan();

/**
 * Captions for the two kinds of lists.
 * @type {{anime: string, manga: string}}
 */
const oListCaptions = {
    anime: "Anime",
    manga: "Manga"
};

/* GET home page. */
oRouter.get('/', function (oReq, oRes, cNext) {
    if (oReq.query.username) {
        // Find
        const sUsername = oReq.query.username;
        oMAL.findUser(sUsername, oReq.query.list + 'list', '/').then(oList => {
           let aEntries = oList[oReq.query.list];
            // Render
            oRes.render('index', {
                sTitle: sUsername + "'s " + oListCaptions[oReq.query.list] + ' List',
                sUsername: sUsername,
                sList: oReq.query.list,
                oListCaptions: oListCaptions,
                aEntries: aEntries
            });
        }).catch(err => console.log(err));
    } else {
        oRes.render('index', {
            sTitle: 'MyAnimangaScore',
            sUsername: '',
            sList: '',
            oListCaptions: oListCaptions,
            aEntries: null
        });
    }
});

module.exports = oRouter;
