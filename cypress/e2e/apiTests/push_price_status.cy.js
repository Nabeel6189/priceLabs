describe('Validate Sync toggle api', () => {
    beforeEach(() => {
        cy.apiLogin('qa.pricelabs@gmail.com', 'qg33N$yxJP');
    });

    let payload = {
        "push_status":false,
        "listing_id":"SUNSETPROPS_OLSE___533",
        "pms_name":"vrm"
    };

    it('Validate if toggle on updates the sync settings', () => {
        cy.makeRequest('POST', 'push_price_status', {body: payload}).then((res) => {
            expect(res.body).property('message').eq('SUCCESS');
        })
    })
})