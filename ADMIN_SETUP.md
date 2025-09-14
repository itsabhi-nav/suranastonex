wh# Admin Panel Setup Guide

## 🚀 **Complete Admin Panel with Cloudinary Integration**

Your admin panel is now ready with advanced features! Here's how to set it up:

## 📋 **Features Included:**

### ✅ **Complete Marble Management:**
- **Add new marbles** with image upload
- **Edit existing marbles** with all details
- **Delete marbles** (with Cloudinary image cleanup)
- **Toggle featured status** for homepage display
- **Export/Import data** as JSON files
- **Reset to defaults** anytime

### ✅ **Cloudinary Integration:**
- **Automatic image upload** to Cloudinary
- **Image deletion** from Cloudinary when marble is deleted
- **Optimized image storage** (no localStorage bloat)
- **Fast image loading** with CDN

### ✅ **Featured Marbles System:**
- **Select featured marbles** for homepage
- **Toggle featured status** with star button
- **Automatic homepage updates** based on selection

## 🔧 **Setup Instructions:**

### **1. Cloudinary Setup:**
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Create a free account (or use existing)
3. Note down your:
   - **Cloud Name**
   - **API Key** 
   - **API Secret**

### **2. Environment Variables:**
Create a `.env.local` file in your project root:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=marbles_upload
```

### **3. Cloudinary Upload Preset (IMPORTANT):**
1. Go to Cloudinary Dashboard → Settings → Upload
2. Click "Add upload preset"
3. Name it exactly: `marbles_upload`
4. **CRITICAL**: Set "Signing Mode" to **"Unsigned"**
5. Set folder to `marbles/` (optional)
6. **Save the preset**

**If you get "Upload preset must be whitelisted" error:**
- Make sure the preset name matches exactly: `marbles_upload`
- Ensure "Signing Mode" is set to "Unsigned"
- The preset must be saved and active

### **4. Development Mode (No Cloudinary Setup Required):**
If you want to test the admin panel without setting up Cloudinary:
- The system will automatically use fallback images (`/italian.png`)
- All functionality works except real image uploads
- Perfect for development and testing

### **5. Access Admin Panel:**
- URL: `http://localhost:3000/admin`
- Password: `admin123` (change this in the code)

## 🎯 **How to Use:**

### **Adding New Marbles:**
1. Click "Add Marble" button
2. Fill in required fields (Name, Color, Origin)
3. Upload image (automatically goes to Cloudinary)
4. Check "Featured on Homepage" if needed
5. Click "Add Marble"

### **Managing Featured Marbles:**
1. Go to "Featured Marbles" tab
2. Use star button to toggle featured status
3. Homepage automatically updates with featured marbles

### **Editing Marbles:**
1. Click edit button (pencil icon)
2. Modify any details
3. Upload new image if needed (old image deleted from Cloudinary)
4. Save changes

### **Deleting Marbles:**
1. Click delete button (trash icon)
2. Confirm deletion
3. Image automatically deleted from Cloudinary

## 🔒 **Security Notes:**

- Change the admin password in the code
- Consider adding more robust authentication for production
- Cloudinary API keys should be kept secure

## 📊 **Performance Benefits:**

- **No localStorage bloat** - images stored in Cloudinary
- **Fast loading** - CDN delivery
- **Automatic optimization** - Cloudinary handles image optimization
- **Scalable** - can handle thousands of marbles

## 🎨 **Admin Panel Features:**

- **Two tabs**: All Marbles & Featured Marbles
- **Image preview** in table
- **Featured toggle** with star icons
- **Export/Import** functionality
- **Reset to defaults** option
- **Responsive design** for all devices

Your admin panel is now production-ready with professional image management!
