const CourseMarketplace = artifacts.require('CourseMarketplace');

contract('CourseMarketplace', accounts => {
    let _contract = null;
    let _owner = null;
    let _buyer = null;

    before(async () => {
        _contract = await CourseMarketplace.deployed();
        _owner = accounts[0];
        _buyer = accounts[1];

        console.log('Contract deployed at:', _contract.address);
        console.log('Owner:', _owner);
        console.log('Buyer:', _buyer);
    });

    describe('CourseMarketplace', () => {
        it('should deploy', async () => {
            assert(_contract.address);
        });
    });
});

