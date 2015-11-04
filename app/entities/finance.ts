module Finance {
    export interface Amount {
        copper?:   number;
        silver?:   number;
        electrum?: number;
        gold?:     number;
        platinum?: number;
    }

    export class Currency {
        constructor(
            public name: string,
            public shortName: string,
            public multiplier: number) {}
    }

    export const Exchange = { // Must be ascending
        copper:   new Currency("Copper",   "cp", 1),
        silver:   new Currency("Silver",   "sp", 10),
        electrum: new Currency("Electrum", "ep", 50),
        gold:     new Currency("Gold",     "gp", 100),
        platinum: new Currency("Platinum", "pp", 1000)
    }

    export function toCopper(wallet: Amount) {
        var total = 0;
        $.each(Exchange, function(key, currency) {
            if (wallet[key] && typeof wallet[key] === 'number') {
                total += wallet[key] * currency.multiplier;
            }
        });
        return total;
    }

    export function minus(wallet: Amount, cost: Amount): Amount {
        var costInCopper = toCopper(cost);
        var walletInCopper = toCopper(wallet);
        var remainder = walletInCopper - costInCopper;

        var newWallet: Amount = {};
        var currencies = Object.keys(Exchange).reverse();
        // Changemaking
        currencies.forEach(key => {
            if (key === 'electrum') {
                return; // Don't bother making change for electrum
            }
            var currency = Exchange[key];
            if (currency.multiplier <= remainder) {
                var newRemainder = remainder % currency.multiplier;
                newWallet[key] = (remainder - newRemainder) / currency.multiplier;
                remainder = newRemainder;
            }
        });
        return newWallet;
    }
}