import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'BlogsWebsite',
  api_key: '163264821788468',
  api_secret: 'CKqHa4e0hVAt08l7zgFaasF9ShY',
});

export default cloudinary;