'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Save, X, Lock, Upload, Star, 
  StarOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Marble, marbles as defaultMarbles } from '@/data/marbles';
import { extractPublicId } from '@/lib/cloudinary';
import Image from 'next/image';

interface AdminMarble extends Marble {
  isEditing?: boolean;
}

// Available categories for dropdown
const categories = [
  'Classic',
  'Premium', 
  'Modern',
  'Warm',
  'Minimalist',
  'Artistic',
  'Bold',
  'Natural',
  'Luxury',
  'Rustic',
  'Exotic',
  'Durable'
];

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [marbles, setMarbles] = useState<AdminMarble[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMarble, setEditingMarble] = useState<AdminMarble | null>(null);
  const [uploading, setUploading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'marbles' | 'featured'>('marbles');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);
  const editMultipleFileInputRef = useRef<HTMLInputElement>(null);

  const [newMarble, setNewMarble] = useState<Partial<Marble>>({
    name: '',
    color: '',
    priceContact: 'Contact for Best Pricing',
    origin: '',
    description: '',
    image: '',
    images: [],
    size: '60x60cm',
    rarity: 'common',
    category: '',
    patterns: [],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'New Arrival',
    isFeatured: false
  });
  const [newMarbleImages, setNewMarbleImages] = useState<string[]>([]);
  const [editingMarbleImages, setEditingMarbleImages] = useState<string[]>([]);

  // Secure authentication
  const handleLogin = async () => {
    if (!password.trim()) {
      setLoginError('Please enter a password');
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword('');
        setLoginError('');
        setRemainingAttempts(5);
      } else {
        setLoginError(data.error || 'Login failed');
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
        if (data.lockoutTime) {
          const lockoutMinutes = Math.ceil((data.lockoutTime - Date.now()) / (1000 * 60));
          setLoginError(`Too many failed attempts. Try again in ${lockoutMinutes} minutes.`);
        }
      }
    } catch {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.error('Logout error');
    } finally {
      setIsAuthenticated(false);
      setPassword('');
      setLoginError('');
      setRemainingAttempts(5);
    }
  };


  // Load marbles from API
  useEffect(() => {
    const loadMarbles = async () => {
      try {
        setAdminLoading(true);
        const response = await fetch('/api/marbles', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          // If no admin data exists, use default marbles
          if (data.marbles && data.marbles.length > 0) {
            setMarbles(data.marbles);
          } else {
            // Initialize with default marbles
            setMarbles(defaultMarbles);
          }
        } else {
          // Fallback to default marbles if API fails
          setMarbles(defaultMarbles);
        }
      } catch {
        console.error('Error loading marbles');
        // Fallback to default marbles
        setMarbles(defaultMarbles);
      } finally {
        setAdminLoading(false);
      }
    };
    
    loadMarbles();
  }, []);

  // Save marbles to API
  // const saveMarbles = async (updatedMarbles: AdminMarble[]) => {
  //   setMarbles(updatedMarbles);
  //   // Note: Individual operations (add, update, delete) will handle API calls
  // };

  // Handle single image upload
  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      alert(`Upload Error: ${errorMessage}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle multiple image upload
  const handleMultipleImageUpload = async (files: File[]): Promise<{secure_url: string, public_id: string}[]> => {
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/cloudinary/upload-multiple', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      return data.images;
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      alert(`Upload Error: ${errorMessage}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle image deletion from Cloudinary
  const handleImageDelete = async (imageUrl: string) => {
    try {
      const publicId = extractPublicId(imageUrl);
      if (publicId) {
        const response = await fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId }),
        });
        
        const data = await response.json();
        if (!response.ok) {
          console.error('Failed to delete image from Cloudinary:', data.error);
        } else {
          console.log('Image deleted from Cloudinary:', data.message);
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't show error to user as the marble will still be deleted
    }
  };

  // Add new marble
  const handleAddMarble = async () => {
    if (!newMarble.name || !newMarble.color || !newMarble.origin) {
      alert('Please fill in required fields (Name, Color, Origin)');
      return;
    }

    const marble: AdminMarble = {
      id: Date.now().toString(),
      name: newMarble.name!,
      color: newMarble.color!,
      priceContact: newMarble.priceContact!,
      origin: newMarble.origin!,
      description: newMarble.description!,
      image: newMarble.image || '',
      images: newMarbleImages,
      size: newMarble.size!,
      rarity: newMarble.rarity!,
      category: newMarble.category!,
      patterns: newMarble.patterns || [],
      material: newMarble.material!,
      finish: newMarble.finish!,
      sellingStatus: newMarble.sellingStatus!,
      isFeatured: newMarble.isFeatured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/marbles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(marble)
      });

      if (response.ok) {
        const data = await response.json();
        setMarbles(prev => [...prev, data.marble]);
        
        // Reset form
        setNewMarble({
          name: '',
          color: '',
          priceContact: 'Contact for Best Pricing',
          origin: '',
          description: '',
          image: '',
          images: [],
          size: '60x60cm',
          rarity: 'common',
          category: '',
          patterns: [],
          material: 'Natural Marble',
          finish: 'Polished',
          sellingStatus: 'New Arrival',
          isFeatured: false
        });
        setNewMarbleImages([]);
        setShowAddForm(false);
      } else {
        alert('Failed to add marble');
      }
    } catch (error) {
      console.error('Error adding marble:', error);
      alert('Failed to add marble');
    }
  };

  // Edit marble
  const handleEditMarble = (marble: AdminMarble) => {
    setEditingMarble({ ...marble });
    setEditingMarbleImages(marble.images || []);
  };

  // Save edited marble
  const handleSaveEdit = async () => {
    if (!editingMarble) return;

    const updatedMarble = {
      ...editingMarble,
      images: editingMarbleImages,
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/marbles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedMarble)
      });

      if (response.ok) {
        const data = await response.json();
        setMarbles(prev => prev.map(m => 
          m.id === updatedMarble.id ? data.marble : m
        ));
        setEditingMarble(null);
        setEditingMarbleImages([]);
      } else {
        alert('Failed to update marble');
      }
    } catch (error) {
      console.error('Error updating marble:', error);
      alert('Failed to update marble');
    }
  };

  // Delete marble
  const handleDeleteMarble = async (marble: AdminMarble) => {
    if (confirm(`Are you sure you want to delete "${marble.name}"?`)) {
      try {
        // Delete primary image from Cloudinary if it's a Cloudinary URL
        if (marble.image.includes('cloudinary.com')) {
          await handleImageDelete(marble.image);
        }

        // Delete additional images from Cloudinary if they exist
        if (marble.images && marble.images.length > 0) {
          for (const imageUrl of marble.images) {
            if (imageUrl.includes('cloudinary.com')) {
              await handleImageDelete(imageUrl);
            }
          }
        }

        // Delete marble from API
        const response = await fetch('/api/marbles', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ id: marble.id })
        });

        if (response.ok) {
          setMarbles(prev => prev.filter(m => m.id !== marble.id));
        } else {
          alert('Failed to delete marble');
        }
      } catch (error) {
        console.error('Error deleting marble:', error);
        alert('Failed to delete marble');
      }
    }
  };

  // Toggle featured status
  const toggleFeatured = async (marble: AdminMarble) => {
    const updatedMarble = {
      ...marble,
      isFeatured: !marble.isFeatured,
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/marbles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedMarble)
      });

      if (response.ok) {
        const data = await response.json();
        setMarbles(prev => prev.map(m => 
          m.id === updatedMarble.id ? data.marble : m
        ));
      } else {
        alert('Failed to update featured status');
      }
    } catch (error) {
      console.error('Error updating featured status:', error);
      alert('Failed to update featured status');
    }
  };

  // Handle file input for new marble
  const handleNewImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setNewMarble({ ...newMarble, image: imageUrl });
      } catch {
        // Error already handled in handleImageUpload
      }
    }
  };

  // Handle file input for editing marble
  const handleEditImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingMarble) {
      try {
        // Delete old image if it's from Cloudinary
        if (editingMarble.image.includes('cloudinary.com')) {
          await handleImageDelete(editingMarble.image);
        }

        const imageUrl = await handleImageUpload(file);
        setEditingMarble({ ...editingMarble, image: imageUrl });
      } catch {
        // Error already handled in handleImageUpload
      }
    }
  };

  // Handle primary image deletion for editing
  const handleDeletePrimaryImage = async () => {
    if (editingMarble && editingMarble.image) {
      try {
        // Delete from Cloudinary if it's a Cloudinary URL
        if (editingMarble.image.includes('cloudinary.com')) {
          await handleImageDelete(editingMarble.image);
        }
        
        // Clear the primary image
        setEditingMarble({ ...editingMarble, image: '' });
      } catch (error) {
        console.error('Error deleting primary image:', error);
        alert('Failed to delete primary image');
      }
    }
  };

  // Handle primary image deletion for new marble
  const handleDeleteNewPrimaryImage = async () => {
    if (newMarble.image) {
      try {
        // Delete from Cloudinary if it's a Cloudinary URL
        if (newMarble.image.includes('cloudinary.com')) {
          await handleImageDelete(newMarble.image);
        }
        
        // Clear the primary image
        setNewMarble({ ...newMarble, image: '' });
      } catch (error) {
        console.error('Error deleting primary image:', error);
        alert('Failed to delete primary image');
      }
    }
  };

  // Handle multiple file input for new marble
  const handleNewMultipleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      try {
        const uploadedImages = await handleMultipleImageUpload(files);
        const imageUrls = uploadedImages.map(img => img.secure_url);
        setNewMarbleImages(prev => [...prev, ...imageUrls]);
      } catch {
        // Error already handled in handleMultipleImageUpload
      }
    }
  };

  // Handle multiple file input for editing marble
  const handleEditMultipleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && editingMarble) {
      try {
        const uploadedImages = await handleMultipleImageUpload(files);
        const imageUrls = uploadedImages.map(img => img.secure_url);
        setEditingMarbleImages(prev => [...prev, ...imageUrls]);
      } catch {
        // Error already handled in handleMultipleImageUpload
      }
    }
  };

  // Remove image from new marble images
  const removeNewMarbleImage = (index: number) => {
    setNewMarbleImages(prev => prev.filter((_, i) => i !== index));
  };

  // Remove image from editing marble images
  const removeEditingMarbleImage = (index: number) => {
    setEditingMarbleImages(prev => prev.filter((_, i) => i !== index));
  };


  const featuredMarbles = marbles.filter(marble => marble.isFeatured);
  // const regularMarbles = marbles.filter(marble => !marble.isFeatured);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Enter password to access</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loginLoading && handleLogin()}
              disabled={loginLoading}
            />
            
            {loginError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                {loginError}
              </div>
            )}
            
            {remainingAttempts < 5 && remainingAttempts > 0 && (
              <div className="text-orange-600 text-sm bg-orange-50 p-3 rounded-md border border-orange-200">
                {remainingAttempts} attempts remaining
              </div>
            )}
            
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              <p>🔒 Secure authentication required</p>
              <p>Strong password with 12+ characters</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading State */}
      {adminLoading && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin panel...</p>
          </div>
        </div>
      )}

      {/* Header */}
      {!adminLoading && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Marble Admin Panel</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your marble collection with Cloudinary integration</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button onClick={() => setShowAddForm(true)} size="sm" className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add Marble</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <Button 
                  onClick={handleLogout} 
                  size="sm" 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Exit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      {!adminLoading && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('marbles')}
                className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'marbles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">All Marbles</span>
                <span className="sm:hidden">All</span>
                <span className="ml-1">({marbles.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'featured'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">Featured Marbles</span>
                <span className="sm:hidden">Featured</span>
                <span className="ml-1">({featuredMarbles.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {!adminLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Add Marble Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold">Add New Marble</h2>
              <Button variant="outline" onClick={() => setShowAddForm(false)} size="sm">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  value={newMarble.name}
                  onChange={(e) => setNewMarble({ ...newMarble, name: e.target.value })}
                  placeholder="Marble name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <Input
                  value={newMarble.color}
                  onChange={(e) => setNewMarble({ ...newMarble, color: e.target.value })}
                  placeholder="Marble color"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origin *
                </label>
                <Input
                  value={newMarble.origin}
                  onChange={(e) => setNewMarble({ ...newMarble, origin: e.target.value })}
                  placeholder="Country/Region"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  value={newMarble.category}
                  onValueChange={(value) => setNewMarble({ ...newMarble, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Image (for cards)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Primary Image'}
                  </Button>
                  {newMarble.image && (
                    <div className="w-12 h-12 relative group">
                      <Image
                        src={newMarble.image}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={handleDeleteNewPrimaryImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        title="Delete primary image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images (for detail page)
                </label>
                <div className="space-y-3">
                  <input
                    ref={multipleFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewMultipleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => multipleFileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Multiple Images'}
                  </Button>
                  
                  {/* Image Previews */}
                  {newMarbleImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {newMarbleImages.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="w-16 h-16 relative">
                            <Image
                              src={imageUrl}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeNewMarbleImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rarity
                </label>
                <select
                  value={newMarble.rarity}
                  onChange={(e) => setNewMarble({ ...newMarble, rarity: e.target.value as 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Status
                </label>
                <select
                  value={newMarble.sellingStatus}
                  onChange={(e) => setNewMarble({ ...newMarble, sellingStatus: e.target.value as 'Selling Fast' | 'Best Seller' | 'Out of Stock' | 'New Arrival' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New Arrival">New Arrival</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Selling Fast">Selling Fast</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newMarble.isFeatured || false}
                    onChange={(e) => setNewMarble({ ...newMarble, isFeatured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured on Homepage</span>
                </label>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newMarble.description}
                  onChange={(e) => setNewMarble({ ...newMarble, description: e.target.value })}
                  placeholder="Marble description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMarble} disabled={uploading}>
                <Save className="w-4 h-4 mr-2" />
                Add Marble
              </Button>
            </div>
          </motion.div>
        )}

        {/* Marbles List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold">
              {activeTab === 'featured' ? 'Featured Marbles' : 'All Marbles'} ({activeTab === 'featured' ? featuredMarbles.length : marbles.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Color
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Origin
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Category
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Rarity
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(activeTab === 'featured' ? featuredMarbles : marbles).map((marble) => (
                  <tr key={marble.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 relative">
                        <Image
                          src={marble.image}
                          alt={marble.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 max-w-[120px] sm:max-w-none truncate sm:truncate-none">
                        {marble.name}
                      </div>
                      <div className="text-xs text-gray-500 sm:hidden">
                        {marble.color} • {marble.origin}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-xs sm:text-sm text-gray-500">{marble.color}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-xs sm:text-sm text-gray-500">{marble.origin}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-xs sm:text-sm text-gray-500">{marble.category}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        marble.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                        marble.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
                        marble.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        marble.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {marble.rarity}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        marble.sellingStatus === 'New Arrival' ? 'bg-blue-100 text-blue-800' :
                        marble.sellingStatus === 'Best Seller' ? 'bg-green-100 text-green-800' :
                        marble.sellingStatus === 'Selling Fast' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {marble.sellingStatus}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFeatured(marble)}
                        className={`${marble.isFeatured ? 'text-yellow-600 border-yellow-600' : 'text-gray-400'} w-8 h-8 sm:w-auto sm:h-auto`}
                      >
                        {marble.isFeatured ? <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" /> : <StarOff className="w-3 h-3 sm:w-4 sm:h-4" />}
                        <span className="hidden sm:inline ml-1">Featured</span>
                      </Button>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditMarble(marble)}
                          className="w-full sm:w-auto"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline ml-1">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteMarble(marble)}
                          className="text-red-600 hover:text-red-700 w-full sm:w-auto"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline ml-1">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingMarble && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Edit Marble</h2>
                <Button variant="outline" onClick={() => setEditingMarble(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    value={editingMarble.name}
                    onChange={(e) => setEditingMarble({ ...editingMarble, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <Input
                    value={editingMarble.color}
                    onChange={(e) => setEditingMarble({ ...editingMarble, color: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin
                  </label>
                  <Input
                    value={editingMarble.origin}
                    onChange={(e) => setEditingMarble({ ...editingMarble, origin: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select
                    value={editingMarble.category}
                    onValueChange={(value) => setEditingMarble({ ...editingMarble, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Image (for cards)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      ref={editFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => editFileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload New Primary Image'}
                    </Button>
                    {editingMarble.image && (
                      <div className="w-12 h-12 relative group">
                        <Image
                          src={editingMarble.image}
                          alt="Current"
                          fill
                          className="object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={handleDeletePrimaryImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          title="Delete primary image"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Images (for detail page)
                  </label>
                  <div className="space-y-3">
                    <input
                      ref={editMultipleFileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleEditMultipleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => editMultipleFileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Additional Images'}
                    </Button>
                    
                    {/* Image Previews */}
                    {editingMarbleImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {editingMarbleImages.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <div className="w-16 h-16 relative">
                              <Image
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeEditingMarbleImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rarity
                  </label>
                  <select
                    value={editingMarble.rarity}
                    onChange={(e) => setEditingMarble({ ...editingMarble, rarity: e.target.value as 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Status
                  </label>
                  <select
                    value={editingMarble.sellingStatus}
                    onChange={(e) => setEditingMarble({ ...editingMarble, sellingStatus: e.target.value as 'Selling Fast' | 'Best Seller' | 'Out of Stock' | 'New Arrival' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="New Arrival">New Arrival</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Selling Fast">Selling Fast</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingMarble.isFeatured || false}
                      onChange={(e) => setEditingMarble({ ...editingMarble, isFeatured: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured on Homepage</span>
                  </label>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingMarble.description}
                    onChange={(e) => setEditingMarble({ ...editingMarble, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setEditingMarble(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} disabled={uploading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}