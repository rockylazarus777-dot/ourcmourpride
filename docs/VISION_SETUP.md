# Vision Page Implementation - Setup Guide

## Overview
The complete Vision Page has been implemented with 10 premium, modern sections featuring:
- Dynamic hero slider with 3 vision-focused slides
- Circular 5 pillars infographic
- Alternating pillar cards with detailed content
- Interactive timeline to 2030
- 6 strategic priority cards with hover effects
- Impact counters with animated numbers
- Future vision cards
- Inspirational quote section
- Call-to-action section

## Design Theme
- **Primary Color**: Pink (#E91E63)
- **Secondary Pink**: #F8BBD0
- **Typography**: Raleway (headings), Roboto/Poppins, Inter (body)
- **Animations**: Framer Motion with scroll-based triggers
- **Responsive**: Mobile-first, optimized for all screen sizes

## Required Images

Add the following placeholder images to `/public/images/`:

### Hero Slider Images (3 images required)
1. **vision-future-skyline.jpg** (16:9 aspect ratio)
   - Future Tamil Nadu skyline with modern infrastructure
   - Size: 1920x1080 minimum
   - Usage: Hero slide 1 background

2. **vision-citizens.jpg** (16:9 aspect ratio)
   - Citizens, youth, students, professionals together
   - Size: 1920x1080 minimum
   - Usage: Hero slide 2 background

3. **vision-green.jpg** (16:9 aspect ratio)
   - Modern infrastructure with green environment
   - Size: 1920x1080 minimum
   - Usage: Hero slide 3 background

### Section Images
4. **vision-intro.jpg** (1:1 square aspect ratio)
   - Vision introduction imagery
   - Size: 500x500 minimum
   - Usage: Vision Intro section

5. **vision-impact.jpg** (16:9 aspect ratio)
   - Diverse community and impact imagery
   - Size: 1920x1080 minimum
   - Usage: Impact section background

6. **vision-smart-cities.jpg** (4:3 aspect ratio)
   - Smart city development and urban tech
   - Size: 1200x900 minimum
   - Usage: Future cards grid

7. **vision-green-env.jpg** (4:3 aspect ratio)
   - Environmental conservation and green spaces
   - Size: 1200x900 minimum
   - Usage: Future cards grid

8. **vision-education.jpg** (4:3 aspect ratio)
   - Quality education and learning spaces
   - Size: 1200x900 minimum
   - Usage: Future cards grid

9. **vision-communities.jpg** (4:3 aspect ratio)
   - Strong, empowered communities
   - Size: 1200x900 minimum
   - Usage: Future cards grid

10. **vision-cta-bg.jpg** (16:9 aspect ratio)
    - Vision-themed background for CTA
    - Size: 1920x1080 minimum
    - Usage: Call-to-action background

## Components Created

### Hero Component
- `components/hero/VisionHeroSlider.tsx` - 3-slide auto-rotating carousel with navigation

### Section Components
1. `components/sections/VisionIntro.tsx` - Two-column vision introduction
2. `components/sections/VisionWheel.tsx` - Circular 5-pillar infographic
3. `components/sections/VisionPillars.tsx` - Alternating pillar cards
4. `components/sections/VisionRoadmap.tsx` - Timeline to 2030
5. `components/sections/StrategicPriorities.tsx` - 6 strategic priority cards
6. `components/sections/VisionImpact.tsx` - Impact counters with parallax
7. `components/sections/FutureOfTN.tsx` - Future vision cards
8. `components/sections/VisionQuote.tsx` - Inspirational quote section
9. `components/sections/VisionCTA.tsx` - Call-to-action section

### Route
- `app/vision/page.tsx` - Main vision page (already updated from coming-soon)

## Styling Updates
- Added Raleway font (700, 800, 900 weights) to Next.js layout
- Updated tailwind config with `font-raleway` utility class
- Added pink color variables to globals.css
- Maintained existing design system while introducing pink accent color

## Animation Features
- Scroll-triggered animations with Framer Motion
- Staggered reveal patterns
- Hover effects on cards
- Animated counter numbers
- Progressive timeline line animation
- Parallax elements on impact section

## Font Family Classes
- `font-raleway` - For headings (H1)
- `font-poppins` - For secondary headings (H2-H4)
- `font-inter` - For body text

## Color Customization
The vision page uses pink as the primary accent color (#E91E63). The color palette includes:
- Pink: #E91E63
- Pink Secondary: #F8BBD0
- Blue: #3B82F6
- Green: #22C55E
- Red: #EF4444
- Amber: #F59E0B
- Purple: #8B5CF6

## Next Steps
1. Add all required images to `/public/images/`
2. Test the vision page at `/vision`
3. Update image paths if using a different CDN/storage
4. Customize content with actual vision statement and initiatives
5. Connect CTA buttons to appropriate routes/actions

## Performance Considerations
- Images are lazy-loaded where appropriate
- Animations use GPU-accelerated transforms
- Responsive images with proper sizing hints
- SVG decorative elements for lightweight graphics

## Accessibility
- Semantic HTML structure
- ARIA labels on buttons
- Alt text for all images
- Keyboard navigation support
- High contrast text colors

---

**Last Updated**: June 2026
**Status**: Ready for image assets
