const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body
    const ideaValue = Number(numWeeks) * Number(weeklyRevenue);

    if(!numWeeks || !weeklyRevenue || isNaN(ideaValue) || ideaValue < 1000000){
        return res.status(404).send()
    }else{
        next(); 
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
