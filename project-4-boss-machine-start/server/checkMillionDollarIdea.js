const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body
    const ideaValue = numWeeks * weeklyRevenue;

    if(ideaValue < 1000000){
        return res.status(404).json({error: 'It is not a one million idea'})
    }

    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
