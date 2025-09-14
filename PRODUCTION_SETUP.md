# Production Setup Guide

## 🚀 **Pre-Deployment Checklist**

### **1. Environment Variables**
Create `.env.production` with the following variables:

```bash
# Cloudinary Configuration (Required)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Next.js Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### **2. Cloudinary Setup**
1. **Create Cloudinary Account**: https://cloudinary.com
2. **Get API Credentials**: Dashboard → Settings → API Keys
3. **Create Upload Preset**: 
   - Go to Settings → Upload
   - Create new unsigned preset
   - Set folder: `stonex-marbles`
   - Enable: Auto-tagging, Eager transformations

### **3. File Structure**
Ensure these files exist:
- `src/data/marbles.json` - Contains marble data
- `public/marble.mp4` - Video file (placeholder created)
- `public/supply.png` - Image file (placeholder created)

### **4. Build and Deploy**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### **5. Deployment Platforms**

#### **Vercel (Recommended)**
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

#### **Netlify**
1. Connect your GitHub repository
2. Add environment variables in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `.next`

#### **Custom Server**
1. Build the application: `npm run build`
2. Start the server: `npm start`
3. Configure reverse proxy (nginx/Apache)

### **6. Post-Deployment Testing**
- [ ] Test marble listing page
- [ ] Test marble detail pages
- [ ] Test admin panel functionality
- [ ] Test image uploads to Cloudinary
- [ ] Test marble CRUD operations
- [ ] Test featured marble selection

### **7. Performance Optimization**
- [ ] Enable Next.js Image Optimization
- [ ] Configure CDN for static assets
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure caching headers

### **8. Security Considerations**
- [ ] Set up HTTPS
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Secure admin panel access
- [ ] Validate all user inputs

### **9. Backup Strategy**
- [ ] Backup `marbles.json` regularly
- [ ] Backup Cloudinary images
- [ ] Set up automated backups
- [ ] Test restore procedures

### **10. Monitoring**
- [ ] Set up error tracking
- [ ] Monitor API response times
- [ ] Track user interactions
- [ ] Monitor Cloudinary usage

## 🔧 **Troubleshooting**

### **Common Issues:**
1. **Images not loading**: Check Cloudinary configuration
2. **Admin panel not working**: Verify environment variables
3. **API errors**: Check server logs and file permissions
4. **Build failures**: Ensure all dependencies are installed

### **Support:**
- Check server logs for detailed error messages
- Verify environment variables are set correctly
- Test API endpoints individually
- Check file permissions on `marbles.json`

## 📊 **Performance Metrics**
- **Page Load Time**: < 3 seconds
- **API Response Time**: < 500ms
- **Image Load Time**: < 2 seconds
- **Admin Panel Load**: < 1 second

## 🔄 **Maintenance**
- **Weekly**: Check error logs
- **Monthly**: Update dependencies
- **Quarterly**: Review and optimize performance
- **Annually**: Security audit and backup testing
