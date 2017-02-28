var TransactionValidator = function()
{
	// These are placeholder properties
	this.initialAmount = undefined;
	this.amountDonated = 0;
	this.finalAmount = 0;
	this.databaseAmount = 0;
	this.isValidTransaction = false;
};

// This function is responsible for rounding to the correct amount and setting properties of outcome
TransactionValidator.prototype.calculate = function()
{
	// Make sure we have all parameters
	if (this.initialAmount === undefined)
	{
		this.isValidTransaction = false;
	}
	else
	{
		if (this.amountIsValid(this.initialAmount))
		{
			// Take out our decimal and treat as an integer
			var databaseAmount = this.initialAmount.replace(".", "");
			var dollars = Math.floor(databaseAmount / 100);
			var cents = databaseAmount % 100;
			var amountDonated = 0;
			var finalAmount = 0;
			
			if (cents > 0)
			{
				amountDonated = (100 - cents).toString();
				finalAmount = dollars + Math.ceil(cents / 100);
			}
			else
			{
				amountDonated = "0";
				finalAmount = dollars;
			}
			this.databaseAmount = databaseAmount;
			this.amountDonated = amountDonated;
			this.finalAmount = finalAmount.toString() + ".00";
			this.isValidTransaction = true;
		}
		else
		{
			this.isValidTransaction = false;
		}
	}
};

TransactionValidator.prototype.amountIsValid = function(amount)
{
	if (parseFloat(amount) > 0)
	{
		// Check that the decimal place is in the correct place
		if (amount.length - amount.lastIndexOf(".") == 3
				&& amount.indexOf(".") !== -1)
		{
			return true;
		}
	}
	return false;
};

module.exports = TransactionValidator;