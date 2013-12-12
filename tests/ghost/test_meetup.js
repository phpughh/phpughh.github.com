casper.options.logLevel = "error";
casper.options.verbose = false;

casper.test.begin('check meetup widget', function suite(test) {
    casper

    .start('http://127.0.0.1:4000/index.html')

    .then(function() {
        test.assertExists('.next');
    })

    .run(function() {
        test.done();
    });
});
