const service = require('../../server/credit-score-service');
const chai = require('chai');
const expect = chai.expect;

describe('Credit Score Service when inputs are homeOwnership = rent, age = 20, income = 9999, loanAmount = 1000, type = personal', () => {
    let result = service.calculateCreditSummary({
        age: 20,
        homeOwnership: 'rent',
        income: 9999,
        loanAmount: 1000,
        type: 'personal'
    });

    it('Should be DENIED', (callback) => {
        expect(result.approval).to.equal('DENIED');
        callback(null);
    });
    it('Should show 330 credit score', (callback) => {
        expect(result.creditScore).to.equal(330);
        callback(null);
    });
    it('Should show POOR credit rating', (callback) => {
        expect(result.creditRating).to.equal('Poor');
        callback(null);
    });
});

describe('Credit Score Service when inputs are homeOwnership = own, age = 40, income = 100000, loanAmount = 2000, type = personal', () => {
    let result = service.calculateCreditSummary({
        age: 40,
        homeOwnership: 'own',
        income: 100000,
        loanAmount: 2000,
        type: 'personal'
    });

    it('Should be ACCEPTED', (callback) => {
        expect(result.approval).to.equal('ACCEPTED');
        callback(null);
    });
    it('Should show 635 credit score', (callback) => {
        expect(result.creditScore).to.equal(635);
        callback(null);
    });
    it('Should show GREAT credit rating', (callback) => {
        expect(result.creditRating).to.equal('Great');
        callback(null);
    });
    it('Should show 6.99 interest rate', (callback) => {
        expect(result.interest).to.equal(6.99);
        callback(null);
    });
    it('Should show 70000 Loan Threshold', (callback) => {
        expect(result.loanThreshold).to.equal(70000);
        callback(null);
    });
    it('Should have calculations', (callback) => {
        expect(result.calculation).to.have.property('threeYear');
        expect(result.calculation).to.have.property('fiveYear');
        callback(null);
    });

    // Calculations
    it('Should have 2000 approved loan for threeYear', (callback) => {
        expect(result.calculation.threeYear.approvedLoan).to.equal(2000);
        callback(null);
    });
    it('Should have 67.20555555555556 monthly repayment for threeYear', (callback) => {
        expect(result.calculation.threeYear.monthlyRepayment).to.equal(67.20555555555556);
        callback(null);
    });
    it('Should have 2419.4 total repayment for threeYear', (callback) => {
        expect(result.calculation.threeYear.totalRepayment).to.equal(2419.4);
        callback(null);
    });
    it('Should have 419.4 total interest for threeYear', (callback) => {
        expect(result.calculation.threeYear.totalInterest).to.equal(419.4);
        callback(null);
    });
});