const userWallet = require('../models/wallet');
function stringInvalid(str) {
    if (str == undefined || str.length === 0 || str == null)
        return true;
    else return false;
}
exports.postAddExp = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const detail = req.body.detail;
        const category = req.body.category;
        const userId = req.user.id;
        if (stringInvalid(amount) || stringInvalid(detail) || stringInvalid(category)) {
            return res.status(400).json({ success: false, err: "Missing input parameters" });
        }
        const data = await userWallet.create({
            amount: amount,
            detail: detail,
            category: category,
            userId: userId
        })
        return res.status(201).json({ success: true, newExpenseDetail: data });
    } catch (err) {

        return res.status(403).json({
            success: false,
            error: err
        })
    }
}

exports.getExpense = async (req, res, next) => {
    try {
        const getWallet = await userWallet.findAll({ where: { userId: req.user.id } });
        return res.status(200).json({ success: true, allUsers: getWallet });

    } catch (err) {
        console.log('***GET expense failed***', JSON.stringify(err));
        return res.status(402).json({
            success: false,
            error: err
        })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const uId = req.params.id;
        const userId = req.user.userId;
        if (stringInvalid(uId)) {
            console.log('ID is missing');
            return res.status(400).json({ success: false, err: 'ID is missing' });
        }

        await userWallet.destroy({ where: { id: uId, userId: userId } }).then((noOfRows) => {
            if (noOfRows === 0) {
                return res.status(404).json({ success: false, message: 'Expense doesnt belong to user' });
            }
            return res.status(200).json({ success: true, message: "Deleted successfully" })
        })

    } catch (err) {
        console.log('***DELETE failed***', JSON.stringify(err));
        res.status(500).json({
            success: false,
            error: err,
            message: 'deletion failed'
        })
    }
}

exports.editExpense = async (req, res, next) => {
    try {
        if (!req.params.id) {
            console.log('ID is missing');
            return res.status(400).json({ err: 'ID is missing' });
        }
        const uId = req.params.id;
        const updatedAmount = req.body.amount;
        const updatedDetail = req.body.detail;
        const updatedCategory = req.body.category;
        data = await userWallet.update(
            { amount: updatedAmount, detail: updatedDetail, category: updatedCategory },
            { where: { id: uId } }
        )
        res.status(201).json({ newExpenseDetail: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
