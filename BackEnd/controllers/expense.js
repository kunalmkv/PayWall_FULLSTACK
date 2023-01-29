const wallet = require('../models/wallet');
const S3service = require('../services/S3services')
const UserServices = require('../services/userservices');
require('dotenv').config();

function stringInvalid(str) {
    if (str == undefined || str.length === 0 || str == null)
        return true;
    else return false;
}
async function uploadToS3(data, filename) {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    })
    /* s3bucket.createBucket(() => {
         var params = {
             Bucket: BUCKET_NAME,
             Key: filename,
             Body: data
         }*/
    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something went wrong', err);
                reject(err);
            }
            else {
                console.log('success', s3response);
                resolve(s3response.Location);
            }
        })

    })

}


const downlaodExpense = async (req, res) => {

    try {
        console.log(req.user.id);

        const expenses = await UserServices.getWallets(req);
        console.log(expenses);
        const userID = req.user.id;
        const stringifiedWallet = JSON.stringify(expenses);
        const filename = `Wallet${userID}/${new Date()}.txt`;
        const fileURL = await S3service.uploadToS3(stringifiedWallet, filename);
        return res.status(201).json({ fileURL, success: true });

    } catch (error) {
        return res.status(500).json({ fileURL: '', success: false, message: error });

    }


}
const postAddExp = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const detail = req.body.detail;
        const category = req.body.category;
        const userId = req.user.id;
        if (stringInvalid(amount) || stringInvalid(detail) || stringInvalid(category)) {
            return res.status(400).json({ success: false, err: "Missing input parameters" });
        }
        const data = await wallet.create({
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

const getExpense = async (req, res, next) => {
    try {
        const getWallet = await wallet.findAll({ where: { userId: req.user.id } });
        return res.status(200).json({ success: true, allUsers: getWallet });

    } catch (err) {
        console.log('***GET expense failed***', JSON.stringify(err));
        return res.status(402).json({
            success: false,
            error: err
        })
    }
}

const deleteExpense = async (req, res, next) => {
    try {
        const uId = req.params.id;
        const userId = req.user.userId;
        if (stringInvalid(uId)) {
            console.log('ID is missing');
            return res.status(400).json({ success: false, err: 'ID is missing' });
        }

        await wallet.destroy({ where: { id: uId, userId: userId } }).then((noOfRows) => {
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

const editExpense = async (req, res, next) => {
    try {
        if (!req.params.id) {
            console.log('ID is missing');
            return res.status(400).json({ err: 'ID is missing' });
        }
        const uId = req.params.id;
        const updatedAmount = req.body.amount;
        const updatedDetail = req.body.detail;
        const updatedCategory = req.body.category;
        data = await wallet.update(
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

module.exports = {
    downlaodExpense,
    postAddExp,
    getExpense,
    deleteExpense,
    editExpense
}