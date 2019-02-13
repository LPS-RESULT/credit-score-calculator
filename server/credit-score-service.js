function calculateScoreOnAge(age) {
    if (age <= 25) return 100;
    if (age <= 33) return 120;
    if (age <= 45) return 185;
    if (age > 45) return 200;
}

function calculateScoreOnHomeOwnership(ownership) {
    if (ownership === 'own') {
        return 225;
    } else {
        return 110;
    }
}

function calculateScoreOnIncome(income) {
    if (income <= 10000) return 120;
    if (income <= 25000) return 140;
    if (income <= 35000) return 180;
    if (income <= 50000) return 200;
    if (income > 25000) return 225;
}

function calculateCreditScore(profile) {
    return calculateScoreOnAge(profile.age)
        + calculateScoreOnHomeOwnership(profile.homeOwnership)
        + calculateScoreOnIncome(profile.income);
}

function calculateCreditRating(score) {
    if (score <= 370) return 'Poor';
    if (score <= 480) return 'Average';
    if (score <= 580) return 'Good';
    if (score <= 630) return 'Very Good';
    if (score > 630) return 'Great';
}

function calculateLoanThreshold(rating) {
    if(rating == 'Average') return 30000;
    if(rating == 'Good') return 40000;
    if(rating == 'Very Good') return 50000;
    if(rating == 'Great') return 70000;
    else return 0;
}

function calculateInterest(rating) {
    if(rating == 'Average') return 24.7;
    if(rating == 'Good') return 18.9;
    if(rating == 'Very Good') return 13.39;
    if(rating == 'Great') return 6.99;
    else return 29.99;
}

function createCalculation(loan, limit, term, interest) {
    let useLoan = loan;
    if(loan > limit) {
        useLoan = limit;
    }
    let totalInterest = (interest * useLoan * term) / 100;
    let totalRepayment = totalInterest + useLoan;
    let monthlyRepayment = totalRepayment / (term * 12);
    return {
        approvedLoan: useLoan,
        monthlyRepayment: monthlyRepayment,
        totalRepayment: totalRepayment ,
        totalInterest: totalInterest
    }
}

module.exports = {
    calculateCreditSummary: (profile) => {
        let defProfile = { //DEFAULTS
            age: 0,
            homeOwnership: 'rent',
            income: 0,
            loanAmount: 0,
            type: 'personal'
        };
        profile = Object.assign(defProfile, profile);
        let creditScore = calculateCreditScore(profile);
        let creditRating = calculateCreditRating(creditScore);
        let loanThreshold = calculateLoanThreshold(creditRating);
        let approvedInterest = calculateInterest(creditRating);
        let granted = 'DENIED';
        if (creditScore > 370) { // APPROVED
            granted = 'ACCEPTED';
            return {
                meta: profile,
                creditScore: creditScore,
                creditRating: creditRating,
                approval: granted,
                loanThreshold: loanThreshold,
                interest: approvedInterest,
                calculation: {
                    threeYear: createCalculation(profile.loanAmount, loanThreshold, 3, approvedInterest),
                    fiveYear: createCalculation(profile.loanAmount, loanThreshold, 5, approvedInterest),
                }
            }
        } else {
            return {
                meta: profile,
                creditScore: creditScore,
                creditRating: creditRating,
                approval: granted
            }
        }

    }
};
