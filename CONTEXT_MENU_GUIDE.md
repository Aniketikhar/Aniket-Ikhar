# Custom Context Menu Documentation

## Overview
The custom right-click context menu replaces the default browser menu with a macOS-style menu that fits your portfolio design.

## Features
✅ **Custom Right-Click Menu** - Completely replaces browser default  
✅ **macOS-Style Design** - Glassmorphism with blur effects  
✅ **Theme Support** - Adapts to light/dark themes  
✅ **Smart Positioning** - Automatically adjusts to stay on screen  
✅ **Keyboard Support** - Press `Escape` to close  
✅ **Mobile Support** - Works on both desktop and iOS views  

## How It Works

### Event Handling
- **Right-click** → Shows custom menu
- **Left-click** → Closes menu
- **Escape key** → Closes menu
- **Menu item click** → Executes action and closes menu

### Customization

#### Adding New Menu Items

Edit `src/components/ContextMenu/ContextMenu.jsx`:

```javascript
const menuItems = [
  {
    label: 'Your Label',
    icon: YourIcon,  // From react-icons
    action: () => {
      // Your action here
    },
    divider: false  // Set to true to add divider after this item
  },
  // ... more items
];
```

#### Changing Menu Appearance

Edit `src/styles/ContextMenu.css`:
- Adjust `.context-menu` for overall styling
- Modify `.context-menu-item` for item styling
- Update theme variants in `.dark` and `.light` sections

#### Example Menu Items

**Open an app:**
```javascript
{
  label: 'Gallery',
  icon: FaImages,
  action: () => openWindow('gallery'),
  divider: false
}
```

**Open external link:**
```javascript
{
  label: 'Portfolio',
  icon: FaGlobe,
  action: () => window.open('https://yoursite.com', '_blank'),
  divider: false
}
```

**Execute custom function:**
```javascript
{
  label: 'Download Resume',
  icon: FaDownload,
  action: () => downloadResume(),
  divider: true
}
```

## Disabling Context Menu for Specific Elements

If you want to allow default context menu on specific elements (like text inputs), add this to the element:

```javascript
<input 
  onContextMenu={(e) => e.stopPropagation()} 
  // ... other props
/>
```

## Updating Social Links

Find these items in `menuItems` array and update URLs:

```javascript
{
  label: 'GitHub',
  icon: FaGithub,
  action: () => window.open('YOUR_GITHUB_URL', '_blank'),
  divider: false
},
{
  label: 'LinkedIn',
  icon: FaLinkedin,
  action: () => window.open('YOUR_LINKEDIN_URL', '_blank'),
  divider: true
}
```

## Available Icons

The component uses `react-icons/fa`. Popular options:
- `FaFolder` - Folder
- `FaBriefcase` - Briefcase
- `FaCog` - Settings/Gear
- `FaEnvelope` - Email
- `FaGithub` - GitHub
- `FaLinkedin` - LinkedIn
- `FaTwitter` - Twitter
- `FaGlobe` - Website
- `FaDownload` - Download
- `FaUser` - User/Profile

Browse all icons at: https://react-icons.github.io/react-icons/icons/fa/

## Tips

1. **Keep menu items focused** - Only include relevant portfolio actions
2. **Use dividers wisely** - Group related items together
3. **Test on mobile** - Long-press triggers context menu on mobile
4. **Update links** - Remember to update GitHub/LinkedIn URLs with your actual profiles

---
Created: 2026-01-06
