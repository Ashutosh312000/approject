const AWS=require('aws-sdk') //install aws-sdk

const uploadtoS3=(data,filename)=>{ 
    const BUCKET_NAME='appproject1'; //bucket name same rhega lekin file name bdlo(you can go inside and cheak the versions)
    const IAM_USER_KEY=process.env.IAM_USER_KEY;                          //to hme name bdlna hoga jise hr br new file name bne
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;

    let s3bucket=new AWS.S3({ //sabse pehle hmne login krne k liye bnaya
        accessKeyId: IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })

    // s3bucket.createBucket(()=>{ //fir bucket bnayi ...per hme har bar bucket nhi bnani isliye yeh
                                        // commented aur iska bracket bhi niche commented hai
        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read' //this will make it public available 
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{ //aur use upload krdia
                if(err){
                    console.log('Something went  wrong',err)
                    reject(err);
                }
                else{
                    resolve(s3response.Location); //yhan se Link chla jayga
                }
    
            })
        })
       
    // })

}

module.exports={
    uploadtoS3
}