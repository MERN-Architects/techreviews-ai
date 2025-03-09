import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  gallery: [{
    type: String,
  }],
  pros: [{
    type: String,
    required: true,
  }],
  cons: [{
    type: String,
    required: true,
  }],
  specifications: {
    type: Map,
    of: String,
  },
  affiliateLinks: {
    amazon: String,
    clickbank: String,
    custom: String,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  subcategory: {
    type: String,
    index: true,
  },
  tags: [{
    type: String,
    index: true,
  }],
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  keywords: [{
    type: String,
    required: true,
  }],
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
}, {
  timestamps: true,
});

// Add text search indexes
productSchema.index({
  title: 'text',
  description: 'text',
  content: 'text',
  keywords: 'text',
});

// Add compound indexes for better query performance
productSchema.index({ category: 1, status: 1 });
productSchema.index({ slug: 1, status: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for formatted date
productSchema.virtual('publishDate').get(function() {
  return this.createdAt.toISOString().split('T')[0];
});

productSchema.virtual('lastUpdated').get(function() {
  return this.updatedAt.toISOString().split('T')[0];
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema); 