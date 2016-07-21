describe("Page Contents", function(){
    
    it("opens the main page and page title is 'Performance Reviewer'", function(){
        browser.get('http://localhost:8765');

        expect(browser.getTitle()).toEqual('Performance Reviewer');
    });
});
