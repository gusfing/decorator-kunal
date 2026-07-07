const https = require('https');
const fs = require('fs');

https.get('https://www.picuki.com/profile/decorlab.in', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    if (data.includes('decorlab.in')) {
      const logoMatch = data.match(/<img src=\"(.*?)\".*?class=\"profile-avatar-image/is);
      if (logoMatch) console.log('LOGO:', logoMatch[1]);
      
      const posts = [...data.matchAll(/<div class=\"box-photo\">.*?<a href=\"(.*?)\".*?<img.*?src=\"(.*?)\"/gis)];
      console.log('POSTS:', posts.map(p => p[2]).slice(0, 6));
    } else {
      console.log('Failed or blocked by Cloudflare');
    }
  });
}).on('error', console.error);
