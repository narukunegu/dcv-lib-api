const books = require( "./books" );

module.exports.register = async server => {
    await books.register( server );
};