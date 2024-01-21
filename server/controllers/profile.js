const Job = require('../models/job');
const Profile = require('../models/profile');

const postProfile = async (req, res) => {
    try{
        const token = req.headers.authorization;
        if(!req.user || !req.user.id || !token) {
            return res.status(401).json({message:'User authentication failed'})
        }
        const {headline, aboutMe, aboutService, serviceSummary, mainCategory, subCategory, topSkills, hourPrice } = req.body.formData;
        const newProfile = new Profile({
            headline,
            serviceSummary,
            aboutMe,
            aboutService,
            mainCategory,
            subCategory,
            topSkills,
            hourPrice,
            createdBy: req.user.id,
        });
        await newProfile.save();
        res.status(200).json({message:'Profile posted successfully', profile: newProfile})
    }catch (error) {
        res.status(500).json({message:'error posting profile', error: error.message});
    }
}
const editProfileRequest = async (req,res) => {
    try{
        const token = req.headers.authorization;
        if (!req.user || !token) {
            return res.status(401).json({message: 'User authentication failed'});
        }
        const {headline, aboutMe, aboutService, serviceSummary, mainCategory, subCategory, topSkills, hourPrice } = req.body.formData;
        const creator = req.user.id;
        const profile = await Profile.findOne({createdBy: creator});
        if(!profile){
            return res.status(404).json({message: 'profile not found'})
        }
        profile.headline= headline;
        profile.aboutMe=aboutMe;
        profile.aboutService= aboutService;
        profile.serviceSummary= serviceSummary;
        profile.mainCategory= mainCategory;
        profile.subCategory= subCategory;
        profile.topSkills= topSkills;
        profile.hourPrice= hourPrice;
        // profile={...profile, headline, aboutMe, aboutService, serviceSummary, mainCategory, subCategory, topSkills, hourPrice}
        await profile.save()
        res.status(200).json({message: 'profile successully updated'})
    }catch (error){
        console.error(error)
        res.status(500).json({message:'failed to find and update profile', error: error.message})
    }
}
  
// const profile = async (req, res) => {
//     try{
//         const profiles = await Profile.find()
//         if(!profiles || profiles.length === 0){
//             return res.status(404).json({message: 'no profiles found'})
//         }
//         res.json(profiles);
//     } catch (error){
//         res.status(500).json({message:'Error recieving profiles', error: error.message})
//     }
// }
const filterProfiles = async (req, res) => {
    try{
      const{sortBy, order,pageSize, data} = req.query
      const sort = sortBy
      const sortOrder = order
      const limit = pageSize
  
      let query = Profile.find().sort({[sort]: sortOrder})
      if('selectedCategory' in data && data.selectedCategory){
        query = query.where('mainCategory').equals(data.selectedCategory)
      }
      if('selectedSubCategory' in data && data.selectedSubCategory){
        query = query.where('subCategory').equals(data.selectedSubCategory)
      }
      if('searchText' in data && data.searchText && data.searchText !==''){
        const searchTextRegex = new RegExp(data.searchText, 'i')
        query = query.or([
          {'headline': {$regex: searchTextRegex}},
          {'aboutService': {$regex : searchTextRegex}}
        ])
      }
      if('priceSelect' in data && data.priceSelect && data.priceSelect !== ''){
        const [minPrice, maxPrice] = data.priceSelect.split('-').map(Number)
        if(!isNaN(minPrice) && !isNaN(maxPrice)){
          query =  query.where('hourPrice').gte(minPrice).lte(maxPrice)
        }else if(!isNaN(minPrice)){
          query = query.where('hourPrice').gte(minPrice)
        } else if(!isNaN(maxPrice)){
          query = query.where('hourPrice').lte(maxPrice)
        }
      }
      if('userCateg' in data && data.useCateg){
        query = query.where('mainCategory').equals(data.userCateg)
      }
      if('defaultResult' in data && data.defaultResult){
        query = query.find().sort({[sort]: sortOrder}).limit(limit)
      }
      query = query.limit(limit)
      const profiles = await query
      res.json(profiles)
    } catch (error) {
      res.status(500).json({message:'error getting profiles', error:error.message})
    }
  }
const profile = async (req, res) => {
    try{
        const {pageSize, category} = req.query;

        const limit = parseInt(pageSize)
        // const sort = sortBy
        // const sortOrder = order
        let aggregationStages = []

        aggregationStages.push({
            $lookup: {
                from:'freelancers',
                localField:'createdBy',
                foreignField:'_id',
                as:'user'
            }
        })
        aggregationStages.push({
            $unwind:'$user'
        })
        aggregationStages.push({
            $lookup:{
                from:'membership',
                localField:'user.membershipID',
                foreignField:'_id',
                as:'membership'
            }
        })
        aggregationStages.push({
            $unwind:{
                path:'$membership',
                preserveNullAndEmptyArrays:true
            }
        })
        aggregationStages.push({
            $addFields:{
                sortBy:{
                    $ifNull: ['$membership.rank', '$createdAt'],
                    // $cond:{
                    //     if:{$gt:['$membership', null]},
                    //     then:'$membership.rank',
                    //     else:'$createdAt'
                    // }
                }
            }
        })
        aggregationStages.push({
            $sort:{
                sortBy:-1
            }
        })
        console.log(category)
        // let query = Profile.find()
        // .sort({[sort] : sortOrder})
        if(category){
            // query = query.where('mainCategory').equals(category)
            aggregationStages.push({
                $match:{
                    'mainCategory':category
                }
            })
        }
        aggregationStages.push({
            $limit:limit
        })
        // query = query.limit(limit)
        const profiles = await Profile.aggregate(aggregationStages)
        res.json(profiles)
        // if(!profiles || profiles.length === 0 ){
        //     query = Profile.find().sort({[sort] : sortOrder}).limit(limit)
        //     const updatedProfiles = await query
        //     res.json(updatedProfiles)
        // }else{
        //     res.json(profiles)
        // }
    } catch (error){
        res.status(500).json({message: 'Error recieving profiles', error: error.message})
    }
}

const getProfileById = async (req,res) => {
    const profileId = req.params.id;
    try{
        const profile = await Profile.findById(profileId);
        if(!profile) {
           return res.status(404).json({message:'profile not found'})
        }
        res.json(profile);
    }catch(error){
        res.status(500).json({message:'error fetching profile', error: error.message})
    }
}

const getProfileByCreator = async (req, res) => {
    const creator = req.params.id;
    try{
        const profile = await Profile.findOne({createdBy : creator})
        if(!profile){
           return res.status(404).json({message:'profile not found'})
        }
        res.status(200).json(profile)
    }catch(error){
        res.status(500).json({message:"error fetching profile",error: error.message})
    }
}

module.exports = {postProfile, profile, getProfileById, getProfileByCreator, editProfileRequest, filterProfiles};